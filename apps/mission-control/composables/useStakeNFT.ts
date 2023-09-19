//@ts-ignore
import { BigNumberish, ethers } from "ethers";
import { placeNFTAdress, pixStakableAdress, pixAdress, assetStakableAdress, assetsAddress } from "@ix/base/composables/Contract/WalletAddresses";
import { ContractContext as MissionControlContract, OrderRequest, PlaceNFTsRequest, RemoveNFTsRequest } from './ABIs/MissionControlv2'
import { ContractContext as AssetsERC1155Contract } from './ABIs/IERC1155Upgradeable'
import AssetERC1155ABI from './ABIs/IERC1155Upgradeable.json'
import { ContractContext as Pix721Contract } from "./ABIs/IERC721";
import RoverABI from './ABIs/rover.json'
import { ContractContext as RoverContract } from "./ABIs/rover";

import MissionControlABI from './ABIs/MissionControlv2.json'
import Pix721ABI from './ABIs/IERC721.json'
import { Tile } from "./useTiles";
import { NftFragment } from "#gql";


export const useStakeNFTContracts = () => {
  const activeChain = useActiveChain()
  const { discardPickedWaste } = useWaste()
  const { proposedNFTStake, proposedNFTRemoval, proposedResourcePick, clearProposedStates, proposedStakeNFTType, proposedTiles } = useProposedNFTStakes()
  const { user } = useUser()
  const { fetchHashForCollectFromTile } = useMcIXAPI()
  const { refresh: fetchLandData } = useLandData()
  const { refresh: refreshTokens } = useTokenData()
  const { refresh: refreshRovers } = useRoverData()
  const { refreshTiles, refreshAllTiles } = useTileData()

  const { confirmWalletConnection, contractSenderSameAsUser } = useWallet()

  const { setTransactionState, resetTransactionState } = useTransactions()

  const stakeContract = useState<MissionControlContract | null>('stake-contract', () => null)

  const assetsContract = useState<AssetsERC1155Contract | null>('asset-contract', () => null)

  const pixContract = useState<Pix721Contract | null>('pix-contract', () => null)

  const roverContract = useState<RoverContract | null>('rover-contract', () => null)

  const currentNonce = useState<number | null>('nonce-number', () => null)

  const stakeNFTAdress = placeNFTAdress[activeChain]

  const pixStakedAdress = pixStakableAdress[activeChain]
  const MCassetStakedAdress = assetStakableAdress[activeChain]
  const roverStakedAddress = roverStakableAddress[activeChain]

  const pixContractAdress = pixAdress[activeChain]
  const assetContractAdress = assetsAddress[activeChain]
  const roverContractAddress = roverAddress[activeChain]


  const setupListeners = () => {

    stakeContract.value?.on("NFTPlaced", async (sender: string) => {
      if (!contractSenderSameAsUser(sender))
        return

      try {
        await fetchAssetsOnNFTPlace('tiles')
      } catch (error) {
        //@ts-ignore
        if (error?.message)
          console.log("[Stake] Error fetching tiles", error.message)
      }

      stakeSuccessful("All staking systems operational, agent.")
    })

    stakeContract.value?.on("NFTRemoved", async (sender: string) => {
      if (!contractSenderSameAsUser(sender))
        return

      try {
        await fetchAssetsOnNFTPlace('tiles')
      } catch (error) {
        //@ts-ignore
        if (error.message)
          console.error("[Stake] Error fetching tiles", error?.message)
      }

      stakeSuccessful("Standard operating procedure for mission abort executed, agent.")
    })

    pixContract.value?.on("PIXMinted", async (account: string,
      tokenId: BigNumberish,
      pixId: BigNumberish,
      category: BigNumberish,
      size: BigNumberish) => {
      if (!contractSenderSameAsUser(account))
        return

      console.log("You minted, pixId: ", pixId.toString(), ", tokenId: ", tokenId.toString(), "category:", category.toString(), "size: ", size.toString())

      await useWait(2000)
      if (proposedNFTStake.value) {
        proposedNFTStake.value.nft.tokenId = Number(tokenId)
        approveAssetForStaking('pix')
      } else {
        stakeFailed("Process was canceled. Try again.")
      }
    })

    pixContract.value?.on("ApprovalForAll", (address: string, approveAddress: string) => {
      if (!contractSenderSameAsUser(address))
        return

      if (approveAddress != pixStakedAdress)
        return console.log("Approve Address is not correct")

      stakeNFT()
    })

    assetsContract.value?.on("ApprovalForAll", (address: string, approveAddress: string) => {
      if (!contractSenderSameAsUser(address))
        return

      if (approveAddress != MCassetStakedAdress)
        return console.log("Approve Address is not correct")

      stakeNFT()
    })

    roverContract.value?.on("ApprovalForAll", (address: string, approveAddress: string) => {
      if (!contractSenderSameAsUser(address))
        return

      if (approveAddress != roverStakedAddress)
        return console.log("Approve Address is not correct")

      stakeNFT()
    })
  }

  const setupStakingContract = (provider: ethers.providers.Web3Provider) => {
    const pixStakingContract = new ethers.Contract(stakeNFTAdress, MissionControlABI.abi, provider.getSigner()) as unknown as MissionControlContract

    const pixBaseContract = new ethers.Contract(pixContractAdress, Pix721ABI.abi, provider.getSigner()) as unknown as Pix721Contract

    // Approval for staking drones/facilities etc... Only needs to be done once!
    const assetContractRaw = new ethers.Contract(assetContractAdress, AssetERC1155ABI.abi, provider.getSigner()) as unknown as AssetsERC1155Contract

    const roverContractRaw = new ethers.Contract(roverContractAddress, RoverABI.abi, provider.getSigner()) as unknown as RoverContract

    stakeContract.value = markRaw(pixStakingContract)
    pixContract.value = markRaw(pixBaseContract)
    assetsContract.value = markRaw(assetContractRaw)
    roverContract.value = markRaw(roverContractRaw)


    setupListeners()
  }

  const approveAssetForStaking = async (type: 'pix' | 'asset' | 'rover') => {
    const { approveContract } = usePayment()

    const assetStakedAdress = type == 'asset' ? MCassetStakedAdress : roverStakedAddress
    const stakeAdress = type == 'pix' ? pixStakedAdress : assetStakedAdress
    const assetsStakedContract = type == 'asset' ? assetsContract : roverContract
    const contract = type == 'pix' ? pixContract : assetsStakedContract

    const approve = await approveContract(contract, stakeAdress)

    if (!approve)
      return await stakeNFT()
    return true
  }


  const stakeSuccessful = (message: string) => {
    const { addNotification } = useNotifications()

    clearStaking()
    addNotification(message)
  }

  const stakeFailed = (msg?: string, merkleError: boolean = false) => {
    const { addNotification } = useNotifications()
    if (merkleError && msg) {
      addNotification(msg, 'proxy-of-change')
    } else if (msg) {
      addNotification("Staking malfunction detected, agent. Quick Response Unit deployed.", 'proxy-of-change', msg)
    }

    console.error("[Stake] Failed", msg)

    clearStaking()
    return false
  }

  const collectedSuccess = async (tiles: Tile[]) => {
    const { addNotification } = useNotifications()
    const { refreshTiles } = useTileData()

    clearStaking()

    addNotification("Object secured, agent.", 'proxy-of-change')

    await refreshTiles(tiles)
    console.log("[Corporations] Collecting Success")
    return true
  }

  const collectedFail = (msg?: string) => {
    const { addNotification } = useNotifications()

    clearStaking()

    currentNonce.value = null

    if (msg)
      addNotification("Error occurred, agent. But your claim is legitimate. We’re solving it right away.", 'proxy-of-change', msg)


    console.error("[Corporations] Collecting Failed", msg)
    return false
  }

  const clearStaking = () => {
    clearProposedStates()
    discardPickedWaste()
    resetTransactionState()
  }


  const collectFromTiles = async (tiles?: Tile[], position?: number[]) => {
    const tileList = (tiles ?? proposedResourcePick.value?.tiles)?.slice(0)
    const positionList = position ?? proposedResourcePick.value.position
    const { onTransactionResolved, confirmWalletConnection } = useWallet()

    if (!tileList)
      return


    if (await confirmWalletConnection() == false)
      return


    try {
      const signature = await getSignature() as any
      setTransactionState('signing')
      const { r, s, v } = signature.data
      const tiles = tileList.map((tile) => ({ x: tile.q, y: tile.r, z: tile.s }))
      const transaction = await stakeContract.value?.collectFromTiles(tiles, positionList, v, r, s,)
      if (!transaction)
        return stakeFailed()

      setTransactionState('minting')

      const tx = await onTransactionResolved(transaction.hash)

      console.log("[Stake] Resource transaction mined", tx)

      await fetchAssetsOnNFTPlace('resources')

      // const message = pickType == 'waste' ? 'Waste secured, agent.' : 'Energy secured, agent.'
      const tilesCollected: Tile[] = tiles.map((tile) => ({ q: tile.x, r: tile.y, s: tile.z }))
      return collectedSuccess(tilesCollected)

    } catch (error) {
      //@ts-ignore
      return collectedFail(error.message)
    }

  }


  const getTilesAndPositionOfAllTiles = (token: NftFragment) => {
    const { tileGroups } = useTileData()
    if (!tileGroups.value)
      return

    const tilesGroupOfTokenType = tileGroups.value.filter(item => item.assets.some(item => item.tokenInfo.type === token.tokenInfo.type))
    const roverTiles = tilesGroupOfTokenType.filter(tileGroup => tileGroup.assets.some(item => item.timeLeft === 0)).map((tile) => ({ x: tile.tile.q, y: tile.tile.r, z: tile.tile.s }))

    const otherTiles = tilesGroupOfTokenType.map((tile) => ({ x: tile.tile.q, y: tile.tile.r, z: tile.tile.s }))

    const assetsOfTokenType = tilesGroupOfTokenType.map(tile => tile.assets).flat().filter(item => item.tokenInfo.type == token.tokenInfo.type)

    const roverPositions = assetsOfTokenType.filter(asset => asset?.timeLeft === 0).map(item => item.index)
    const otherPositions = assetsOfTokenType.map(item => item.index)

    const position = token.tokenInfo.type == 'rover' ? roverPositions : otherPositions
    const tiles = token.tokenInfo.type == 'rover' ? roverTiles : otherTiles
    return {
      tiles,
      position
    }
  }


  const collectFromAllTiles = async (token: NftFragment) => {
    const { onTransactionResolved, confirmWalletConnection } = useWallet()


    if (await confirmWalletConnection() == false)
      return


    try {

      const { tiles, position } = getTilesAndPositionOfAllTiles(token)
      const signature = await getSignature() as any

      if (position.length == 0)
        return stakeFailed("No rover has returned from collecting waste yet.")

      setTransactionState('signing')
      const { r, s, v } = signature.data


      const transaction = await stakeContract.value?.collectFromTiles(tiles, position, v, r, s,)
      if (!transaction)
        return stakeFailed()

      setTransactionState('minting')

      const tx = await onTransactionResolved(transaction.hash)

      console.log("[Stake] Resource transaction mined", tx)

      await Promise.all([refreshAllTiles(), refreshTokens()])

      const tilesCollected: Tile[] = tiles.map((tile) => ({ q: tile.x, r: tile.y, s: tile.z }))
      collectedSuccess(tilesCollected)

    } catch (error) {
      //@ts-ignore
      return collectedFail(error.message)
    }

  }


  const removeNFT = async () => {
    const remove = proposedNFTRemoval.value


    if (remove == null)
      return

    if (await confirmWalletConnection() == false)
      return

    setTransactionState('signing')

    try {
      const { tileGroup: { tile, assets }, quantity } = remove
      const removeNFTRequest: RemoveNFTsRequest = {
        x: tile.q,
        y: tile.r,
        z: tile.s,
      }
      const signature = await getSignature() as any
      setTransactionState('signing')
      const { r, s, v } = signature.data

      if (quantity == 1) {
        await stakeContract.value?.removeNFTs([removeNFTRequest], [remove.position], v, r, s)
        console.log("[Stake] NFT removed", tile)
      } else {
        const positions = assets.map(asset => asset.index)
        positions.push(0)
        const tiles: RemoveNFTsRequest[] = Array(positions.length).fill(removeNFTRequest)

        await stakeContract.value?.removeNFTs(tiles, positions, v, r, s)
        console.log("[Stake] NFTs removed", tiles, "on ", positions)
      }
    } catch (error) {
      //@ts-ignore
      return stakeFailed(error.message)
    }

    setTransactionState('minting')
  }



  const isPixOrAsset = (type: string) => {
    const landTypes = ['pix', 'territory']
    console.log("type", type)
    if (landTypes.includes(type))
      return 'pix'
    if (type == 'rover')
      return 'rover'
    return 'asset'
  }

  const proposeStakeNFT = async () => {
    const { mintPix } = useMerkleMintContract()

    if (!proposedNFTStake.value || !proposedStakeNFTType.value)
      return

    const stakeType = isPixOrAsset(proposedStakeNFTType.value)

    if (proposedNFTStake.value.nft?.tokenId == null && stakeType == 'pix') {
      setTransactionState('minting-pix')
      await mintPix(proposedNFTStake.value.nft)
    } else {
      await approveAssetForStaking(stakeType)
    }
  }


  const stakeNFT = async () => {
    console.log("[Stake] Stake nft called", proposedNFTStake.value)
    if (!proposedStakeNFTType.value || !proposedNFTStake.value)
      return

    const { tile } = proposedNFTStake.value

    if (!tile)
      return

    const stakeType = isPixOrAsset(proposedStakeNFTType.value)

    const tokenId = Number(proposedNFTStake.value.nft.tokenId)

    const rover = proposedNFTStake.value.nft.tokenInfo?.type == 'rover'

    const assetStakedAddress = rover ? roverStakedAddress : MCassetStakedAdress

    const stakeAdress = stakeType == 'pix' ? pixStakedAdress : assetStakedAddress

    const orderRequest: OrderRequest = {
      x: tile.q,
      y: tile.r,
      z: tile.s,
    }

    const placeNFTRequest: PlaceNFTsRequest = {
      order: orderRequest,
      tokenId: tokenId,
      tokenAddress: stakeAdress,
    }


    try {
      setTransactionState('signing')
      console.log("[Stake] Placing NFT", placeNFTRequest)
      await stakeContract.value?.placeNFTs([placeNFTRequest]);
      setTransactionState('minting')
    } catch (error) {
      //@ts-ignore
      return stakeFailed(error.message)
    }

    console.log("[Stake] NFT staked", tile,)
  }

  const fetchAssetsOnNFTPlace = async (type: 'resources' | 'tiles' | 'drones') => {
    const tiles = proposedTiles.value ?? null
    if (!tiles)
      return console.warn("[Stake] No tiles selected to refresh")


    const fetchLand = async () =>
      await Promise.all([fetchLandData(), refreshTiles(tiles), refreshNuxtData('select-land')])

    const assetFetch = type == 'resources' ?
      () => refreshTiles(tiles) :
      () => fetchLand()

    return Promise.all([assetFetch(), refreshTokens(), refreshRovers()].flat())
  }

  const getNonce = () =>
    new Promise(async (resolve, reject) => {
      const credentials = useGraphqlCredentials()

      const count = 0

      const fetchNonce = async (count: number) => {
        if (count > 5) {
          reject("Timed out")
          currentNonce.value = null
          return 0
        }

        const data = await GqlWasteNonce({ credentials })

        const nonce = data.wasteNonce

        if (currentNonce.value != nonce && nonce != null && nonce != undefined) {
          currentNonce.value = nonce ?? null
          return resolve(nonce)
        } else {
          setTimeout(() => fetchNonce(count + 1), 8000)
        }
      }

      fetchNonce(count)
    })


  const getSignature = async () => {
    setTransactionState('nonce')
    try {
      const nonce = await getNonce()
      return await fetchHashForCollectFromTile(user.value.wallet_address, nonce as number, "v2")
    } catch (error) {
      return collectedFail('Could not get new nonce')
    }
  }


  return {
    stakeContract,
    assetsContract,
    getSignature,
    clearStaking,
    collectFromTiles,
    setupStakingContract,
    stakeNFT,
    removeNFT,
    proposeStakeNFT,
    stakeFailed,
    collectFromAllTiles
  }
}