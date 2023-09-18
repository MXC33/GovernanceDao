// Can delete this file when everyone has updated to the new MissionControl v2.
import { ethers } from "ethers";
import { oldPlaceNFTAdress } from "./NFTs/walletAddresses";
import { ContractContext as MissionControlContractOld } from './ABIs/missionControl'


import MissionControlABI from './ABIs/MissionControl.json'

export const useOldStakedOnTileData = () =>
  useAsyncState('old-staked-on-tile-data', async () => {
    const credentials = useGraphqlCredentials()
    const stakedData = await GqlOldStakedOnTile({ credentials })
    return stakedData
  }, { transform: (data) => data.oldStakedOnTile })

export const useClaimAndUnstakeAll = () => {
  const activeChain = useActiveChain()

  const isClaimAndUnstakeOpen = useState('claim-unstake-open', () => false)

  const { setTransactionState, resetTransactionState } = useTransactions()
  const { onTransactionResolved } = useWallet()
  const { addNotification } = useNotifications()

  const stakeContract = useState<MissionControlContractOld | null>('old-stake-contract', () => null)


  const stakeNFTAdress = oldPlaceNFTAdress[activeChain]

  const setupOldStakingContract = (provider: ethers.providers.Web3Provider) => {
    const pixStakingContract = new ethers.Contract(stakeNFTAdress, MissionControlABI.abi, provider.getSigner()) as unknown as MissionControlContractOld

    stakeContract.value = markRaw(pixStakingContract)

  }

  const claimAndUnstakeSuccess = async (transaction: ethers.ContractTransaction) => {
    const { refreshUserInventory } = useUserData()
    const { refresh: refreshOldStakedOnTileData } = useOldStakedOnTileData()

    await onTransactionResolved(transaction.hash)
    resetTransactionState()

    addNotification("The reboot was successful, agent. You must now go to Newlands LLC and obtain the Apollo Contract to use your tiles. You can also pick up the Artemis Contract to obtain additional tiles", 'proxy-of-change', null, { link: '/new-lands', title: 'Newlands' })

    await refreshOldStakedOnTileData()
    await refreshUserInventory()
  }

  const claimAndUnstakeFailed = async (error) => {
    console.log(error)
    resetTransactionState()
    addNotification("Your claim and unstake transaction failed. Please try again.")
    return false
  }



  const claimAndUnstakeAll = async () => {
    const credentials = useGraphqlCredentials()
    const { fetchHashForCollectFromTile } = useMcIXAPI()
    const { walletAdress } = useWallet()

    try {

      setTransactionState('nonce')
      const nonce = await GqlOldWasteNonce({ credentials })
      console.log("nonce old staking contract ", nonce.oldWasteNonce)
      const signature = await fetchHashForCollectFromTile(walletAdress.value, nonce.oldWasteNonce) as any
      console.log("signature data", signature.data)
      const { r, s, v } = signature.data

      setTransactionState('signing')
      const transaction = await stakeContract.value.collectFromTilesAndRemove(v, r, s)
      claimAndUnstakeSuccess(transaction)
    } catch (error) {
      claimAndUnstakeFailed(error)
    }
  }


  return {
    isClaimAndUnstakeOpen,
    setupOldStakingContract,
    claimAndUnstakeAll
  }
}