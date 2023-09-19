import { ethers } from "ethers"
import MissionControlStreamABI from "./ABIs/MissionControlStream.json"
import { ContractContext as SuperAppContract } from './ABIs/MissionControlStream'
import ISuperfluid from "./ABIs/ISuperFluid.json"
import { ContractContext as SuperFluidContract } from './ABIs/ISuperFluid'
import IConstantFlowAgreementV1 from "./ABIs/IConstantFlowAgreement.json"
import { ContractContext as ConstantFlowAgreementV1Contract } from './ABIs/IConstantFlowAgreement'
import ISuperToken from "./ABIs/ISuperToken.json"
import { ContractContext as SuperTokenContract } from './ABIs/ISuperToken'
import IMintableSuperToken from "./ABIs/IMintableSuperToken.json"
import { ContractContext as MintableSuperTokenContract } from './ABIs/IMintableSuperToken'

import { Tile, TileAsset, TileGroup } from "./useTiles"
import { contractFlowAgreementAddress, mintableSuperTokenAddress, missionControlStreamAddress, superFluidAddress, superTokenAddress } from "./NFTs/walletAddresses"
import { NftFragment } from "#gql"

interface ProposedRent {
  tile: Tile,
  isRented: boolean,
  rentalToken?: NftFragment
}

export type RentProposalList = (ProposedRent | null)[]

export const useTileRentProposal = () => {
  const { setTransactionState, resetTransactionState } = useTransactions()

  const proposedTileRental = useState<RentProposalList>('proposed-rent', () => [])

  const setProposal = (proposition: ProposedRent[]) => {
    proposedTileRental.value = proposition
    setTransactionState('accepting')
  }

  const cancelProposal = () => {
    proposedTileRental.value = []
    resetTransactionState()
  }
  return {
    cancelProposal,
    proposedTileRental,
    setProposal,
  }
}

const useSuperAppContract = () => {
  const activeChain = useActiveChain()

  const contractAddress = missionControlStreamAddress[activeChain]

  const ctx = defineMCContract('super-app-contract', {
    contractAddress,
    createContract: (provider) => new ethers.Contract(contractAddress, MissionControlStreamABI.abi, provider.getSigner()) as unknown as SuperAppContract,
    notifications: {
      sender: 'proxy-of-change'
    }
  })

  const createRentTilesGenesis = async (tiles: Tile[], success: (tiles: Tile[]) => Promise<any>) =>
    ctx.createTransaction((contract) => {
      const mappedTiles = tiles.map(({ q, r, s }) => {
        return {
          x: q,
          y: r,
          z: s
        }
      })
      return contract.createRentTilesGenesis(mappedTiles)
    }, {
      onSuccess: () => success(tiles)
    })

  return {
    createRentTilesGenesis,
    ...ctx
  }
}

const useFlowHelpers = () => {
  const flowRate = 385802469135;
  const getFlowRate = (tileCount: number) =>
    String(flowRate * tileCount)

  return { getFlowRate }
}

const useSuperFlowContract = () => {
  const { getFlowRate } = useFlowHelpers()
  const { contractAddress: superAppAddress } = useSuperAppContract()

  const activeChain = useActiveChain()
  const contractAddress = contractFlowAgreementAddress[activeChain]
  const { walletAdress } = useWallet()
  const ctx = defineMCContract<ConstantFlowAgreementV1Contract>('super-flow-address', {
    contractAddress,
    createContract: (provider) => new ethers.Contract(contractAddress, IConstantFlowAgreementV1.abi, provider.getSigner()) as unknown as ConstantFlowAgreementV1Contract
  })


  const createFlow = (currencyAddress: string, tiles: number) =>
    ctx.withContract((contract) =>
      contract.interface.encodeFunctionData("createFlow", [
        currencyAddress,
        superAppAddress,
        getFlowRate(tiles),
        "0x",
      ])
    )

  const updateFlow = (currencyAddress: string, tiles: number) =>
    ctx.withContract((contract) =>
      contract.interface.encodeFunctionData("updateFlow", [
        currencyAddress,
        superAppAddress,
        getFlowRate(tiles),
        "0x",
      ])
    )

  const deleteFlow = (currencyAddress: string) =>
    ctx.withContract((contract) =>
      contract.interface.encodeFunctionData("deleteFlow", [
        currencyAddress,
        walletAdress.value,
        superAppAddress,
        "0x",
      ])
    )

  return {
    ...ctx,
    updateFlow,
    deleteFlow,
    createFlow
  }
}

export const useAGOLDContract = () => {
  const activeChain = useActiveChain()
  const contractAddress = superTokenAddress[activeChain]

  const { pixTokenContract } = usePayment()
  const { approveMoreTokens, getWei } = usePayment()
  const { refresh: refreshCurrencies } = useCurrencyData()

  const swapSuccess = async () => {
    refreshCurrencies()
    return true
  }

  const swapFailed = async () => false


  const ctx = defineMCContract('agold-contract', {
    contractAddress,
    createContract: (provider) => new ethers.Contract(contractAddress, ISuperToken.abi, provider.getSigner()) as unknown as SuperTokenContract
  })


  const swapIXTtoAGOLD = async (amount: number) =>
    ctx.createTransaction((contract) => {
      return contract.upgrade(getWei(amount))
    }, {
      approve: () => {
        return approveMoreTokens(amount, pixTokenContract, contractAddress)
      },
      onSuccess: () => swapSuccess(),
      onFail: () => swapFailed()
    })

  const swapAGOLDtoIXT = async (amount: number) =>
    ctx.createTransaction((contract) => contract.downgrade(getWei(amount)), {
      onSuccess: () => swapSuccess(),
      onFail: () => swapFailed()
    })


  return {
    ...ctx,
    swapAGOLDtoIXT,
    swapIXTtoAGOLD
  }
}

export const useAGOLDLiteContract = () => {
  const activeChain = useActiveChain()
  const contractAddress = mintableSuperTokenAddress[activeChain]

  const ctx = defineMCContract('agold-lite-contract', {
    contractAddress,
    createContract: (provider) => new ethers.Contract(contractAddress, IMintableSuperToken.abi, provider.getSigner()) as unknown as MintableSuperTokenContract
  })

  return ctx
}

export const useTileRent = () => {
  const activeChain = useActiveChain()

  const { provider } = useWallet()
  const { tilesAreEqual } = useTileSelection()
  const { balanceOfToken } = useUserData()
  const { getWei } = usePayment()

  const { refreshTiles, tileGroups } = useTileData()
  const { createRentTilesGenesis } = useSuperAppContract()

  const { refresh: refreshPlayerBaseLevel } = usePlayerBaseLevelData()

  // price per second for each tile
  const contractAddress = superFluidAddress[activeChain]

  const { createFlow, updateFlow, deleteFlow, contractAddress: flowAddress } = useSuperFlowContract()

  const { contractAddress: AGOLDAddress } = useAGOLDContract()
  const { contractAddress: AGOLDLITEAddress } = useAGOLDLiteContract()

  const ctx = defineMCContract('super-fluid-contract', {
    contractAddress,
    createContract: (provider) => new ethers.Contract(contractAddress, ISuperfluid.abi, provider.getSigner()) as unknown as SuperFluidContract
  })

  const getTilesRentedWithToken = (tileGroups: TileGroup[], token: NftFragment) => {
    const address = getAddressFromToken(token)
    return tileGroups.filter((group) => group?.rentalToken == address)
  }

  const getTokenFromAddress = (address: string): NftFragment | null => {
    switch (address) {
      case AGOLDAddress:
        return { tokenInfo: { type: 'astro-gold' } }
      case AGOLDLITEAddress:
        return { tokenInfo: { type: 'astro-gold-lite' } }
      default:
        return null
    }
  }

  const getAddressFromToken = (token: NftFragment): string | null => {
    switch (token.tokenInfo.type) {
      case 'astro-gold':
        return AGOLDAddress
      case 'astro-gold-lite':
        return AGOLDLITEAddress
      default:
        return null
    }
  }

  const getRentedTilesWithToken = (token: NftFragment) => {
    const { tileGroups } = useTileData()

    const tokenAddress = getAddressFromToken(token)
    return tileGroups.value.filter(item =>
      item?.isRented && item?.rentalToken == tokenAddress
    )
  }

  const calculateNetFlow = (list: number[]) => list.reduce((a, b) => a + b, 0)

  const bigNumberFromValue = (value: any) => ethers.BigNumber.from(value)

  const paymentRunoutInFourDays = (payToken: NftFragment) => {
    const payableTokens: string[] = ['astro-gold', 'astro-gold-lite']
    const balanceOfStakedToken = useStakedCorporationGenesis("new-lands").value
    if (balanceOfStakedToken > 0)
      return false

    const tokenBalance = balanceOfToken(payToken)

    if (!payableTokens.includes(payToken.tokenInfo.type))
      return

    const AGOLDRentedTiles = getRentedTilesWithToken(payToken)
    const netFlowList = AGOLDRentedTiles.map(item => Number(item.rentPrice))

    const netFlowSum = calculateNetFlow(netFlowList)
    const bigNumber = bigNumberFromValue(netFlowSum)

    const fourDaysInSeconds = 86400 * 4

    return getWei(tokenBalance).lt(bigNumber.mul(fourDaysInSeconds))
  }

  const anyTilesRented = (address: string) => {
    // We should not do this, the contract should give us rentalToken ZERO_ADDRESS if genesis is staked
    const balanceOfStakedToken = useStakedCorporationGenesis("new-lands")

    if (balanceOfStakedToken.value > 0)
      return false

    const hasRentalTokenOnTile = tileGroups.value.some(item => item.rentalToken == address)
    return hasRentalTokenOnTile
  }

  const filterTiles = (tileGroup: TileGroup[], tiles: Tile[]) => {
    return tileGroup.filter(group =>
      group && tiles.some((tile) =>
        tilesAreEqual(group.tile, tile)
      )
    )
  }

  const getAssetTileGroup = (tileGroups: TileGroup[], type: string) => {
    const typeTileGroup = tileGroups.filter(item => item.assets.some(item => item.tokenInfo.type === type))
    const finishedTypeTileGroup = typeTileGroup.filter(tileGroup => tileGroup.assets.some(item => item.timeLeft === 0))
    return {
      typeTileGroup,
      finishedTypeTileGroup
    }
  }

  const getTypeAssetOfTileGroup = (tileGroups: TileGroup[], type: string) => {

    const tileGroupAssetOfType = getAssetTileGroup(tileGroups, type).typeTileGroup.flatMap(tileGroup => tileGroup.assets?.filter(asset => asset.tokenInfo.type === type) || [])
    const tileGroupFinishedAssetOfType = getAssetTileGroup(tileGroups, type).finishedTypeTileGroup.flatMap(tileGroup => tileGroup.assets?.filter(asset => asset.tokenInfo.type === type) || [])
    return {
      tileGroupAssetOfType,
      tileGroupFinishedAssetOfType
    }
  }

  const getPositions = (assets: TileAsset[]) => assets.map(item => item.index)

  const getTiles = (tileGroups: TileGroup[]) => tileGroups.map(tile => tile.tile)


  const getTilesAndPosition = (tileGroups: TileGroup[]) => {

    const roverFilteredTileGroups = getAssetTileGroup(tileGroups, 'rover').finishedTypeTileGroup
    const droneTileGroups = getAssetTileGroup(tileGroups, 'drone').typeTileGroup
    const facilityTileGroups = getAssetTileGroup(tileGroups, 'facility').typeTileGroup
    const noAssetTileGroups = tileGroups.filter(item => item.assets.length == 0)

    const droneAssets = getTypeAssetOfTileGroup(tileGroups, 'drone').tileGroupAssetOfType
    const roverAssets = getTypeAssetOfTileGroup(tileGroups, 'rover').tileGroupFinishedAssetOfType
    const facilityAssets = getTypeAssetOfTileGroup(tileGroups, 'facility').tileGroupAssetOfType


    const dronePositions = getPositions(droneAssets)
    const roverPositions = getPositions(roverAssets)
    const facilityPositions = getPositions(facilityAssets)
    const noAssetPositions = Array(noAssetTileGroups.length).fill(0)

    const droneTiles = getTiles(droneTileGroups)
    const roverTiles = getTiles(roverFilteredTileGroups)
    const facilityTiles = getTiles(facilityTileGroups)
    const noAssetTiles = getTiles(noAssetTileGroups)


    const tilesWithResources = droneTiles.concat(roverTiles, facilityTiles, noAssetTiles)

    const position = dronePositions.concat(roverPositions, facilityPositions, noAssetPositions)

    return { tilesWithResources, position };
  };

  const hasResourceOnProposedRentedTiles = (tiles: Tile[]) => {
    const { tileGroups } = useTileData()
    const filteredTileGroup = filterTiles(tileGroups.value, tiles)
    const tileGroupsWithResources = filteredTileGroup.filter(item => item.resources?.some(resource => resource?.balance > 0))

    const { tilesWithResources, position } = getTilesAndPosition(tileGroupsWithResources);

    const hasResourceOnTile = filteredTileGroup.some(item => item.resources?.some(resource => resource?.balance > 0));

    console.log(hasResourceOnTile, tilesWithResources, position)
    return { hasResourceOnTile, tilesWithResources, position }
  }

  const tilesAsArray = (tiles: Tile[]) =>
    tiles.map((tile) =>
      [...Object.values(tile)] as number[]
    )

  const rentSuccess = async (tiles?: Tile[]) =>
    Promise.all([refreshTiles(tiles), refreshPlayerBaseLevel()])

  const rentFailed = async () => {
    const tilesInTileGroup = tileGroups.value.map(item => item?.tile)
    return await refreshTiles(tilesInTileGroup)
  }

  const beforeRent = async (tiles: Tile[], token: NftFragment) => {
    const { collectFromTiles } = useStakeNFTContracts()
    const { hasResourceOnTile, tilesWithResources, position } = hasResourceOnProposedRentedTiles(tiles)

    let collected: boolean = true
    if (hasResourceOnTile && tilesWithResources.length != 0)
      collected = await collectFromTiles(tilesWithResources, position)

    const currencyAddress = getAddressFromToken(token)

    return { currencyAddress, collected }
  }

  const createRentTiles = async (tiles: Tile[], token: NftFragment) => {
    const signer = provider.value.getSigner()
    const { currencyAddress, collected } = await beforeRent(tiles, token)

    if (!collected)
      return

    if (token.tokenInfo.type == 'genesis')
      return await createRentTilesGenesis(tiles, () => rentSuccess(tiles))

    if (!currencyAddress)
      return



    return ctx.createTransaction(async () => {
      const encodePlaceOrder = (tiles: Tile[]) => {
        const tileList = tilesAsArray(tiles)
        return ethers.utils.defaultAbiCoder.encode(["tuple(int256, int256, int256)[]"], [tileList]);
      }

      const userData = encodePlaceOrder(tiles);
      const callData = await createFlow(currencyAddress, tiles.length)

      const signConnection = ctx.contract.value.connect(signer)
      return signConnection.callAgreement(flowAddress, callData, userData);
    }, {
      onSuccess: () => rentSuccess(tiles),
      onFail: () => rentFailed(),
      successMessage: "You successfully started your rent."
    })
  }

  const updateRentTiles = async (startRenting: Tile[], stopRenting: Tile[], token: NftFragment, activeCount: number) => {
    const signer = provider.value.getSigner()



    const { currencyAddress, collected } = await beforeRent(startRenting, token)

    if (!collected)
      return

    if (token.tokenInfo.type == 'genesis' && stopRenting.length == 0 && startRenting.length != 0) {
      return await createRentTilesGenesis(startRenting, () => rentSuccess(startRenting))
    }

    if (!currencyAddress)
      return



    const stopCount = stopRenting.length
    const startCount = startRenting.length
    const totalFlowCount = activeCount + startCount - stopCount
    const allTiles = [...startRenting, ...stopRenting]

    if (totalFlowCount == 0) {
      console.log("Flowcount can't be zero. Stopping all")
      return await deleteRentTiles(currencyAddress, allTiles)
    }

    const encode = (startRenting: number[][], stopRenting: number[][]) =>
      ethers.utils.defaultAbiCoder.encode(["tuple(int256, int256, int256)[]", "tuple(int256, int256, int256)[]"],
        [startRenting, stopRenting])

    return ctx.createTransaction(async () => {
      const userData = encode(tilesAsArray(startRenting), tilesAsArray(stopRenting));


      const callData = await updateFlow(currencyAddress, totalFlowCount)

      const signConnection = ctx.contract.value.connect(signer)
      return signConnection.callAgreement(flowAddress, callData, userData);
    }, {
      onSuccess: () => rentSuccess(allTiles),
      onFail: () => rentFailed(),
      successMessage: "You successfully updated your rents."
    })
  }

  const deleteRentTiles = async (currencyAddress: string, tiles: Tile[]) => {
    const signer = provider.value.getSigner()

    return ctx.createTransaction(async () => {
      const callData = await deleteFlow(currencyAddress)
      return ctx.contract.value.connect(signer).callAgreement(flowAddress, callData, "0x")
    }, {
      onSuccess: () => rentSuccess(tiles),
      onFail: () => rentFailed(),
      successMessage: "You successfully stopped your active rents."
    })
  }


  return {
    ...ctx,
    getTilesRentedWithToken,
    getTokenFromAddress,
    createRentTiles,
    updateRentTiles,
    deleteRentTiles,
    createRentTilesGenesis,
    anyTilesRented,
    getAddressFromToken,
    paymentRunoutInFourDays
  }
}