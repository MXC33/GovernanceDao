import { ethers } from 'ethers'
import { ContractContext as StakedMissionControlNFTContract } from './ABIs/StakedMissionControlNFT'
import GenesisNFTContractABI from "./ABIs/genesisNft.json"
import { ContractContext as GenesisNFTContract } from './ABIs/genesisNft'
import StakedMissionControlNFTABI from "./ABIs/StakedMissionControlNFT.json"
import { CorporationStakeItem } from './corporations/useCorporationStake'

const filledLists = (items: CorporationStakeItem[], address: string) => {
  const size = items.length
  const tokenIds = items.map(item => item.token.tokenId)
  const addressList = new Array(size).fill(address)
  const amountList = new Array(size).fill(1)
  return { addressList, amountList, tokenIds }
}

type StakeFn = (stakedItem: CorporationStakeItem[]) => Promise<boolean>

const createStakeUnstakeFn = (stake: StakeFn, unstake: StakeFn) => async (stakedItem: CorporationStakeItem[]) => {
  const stakeNFTs = stakedItem.filter((item) => item.state == 'stake')
  const unstakeNFTs = stakedItem.filter((item) => item.state == 'unstake')
  let didStake = true

  if (stakeNFTs.length > 0) {
    didStake = await stake(stakeNFTs)
  }
  if (unstakeNFTs.length > 0) {
    didStake = didStake && await unstake(unstakeNFTs)
  }

  return didStake
}

export const useStakeMCNFT = () => {
  const activeChain = useActiveChain()
  const stakeMCNFTAddress = stakedMissionControlNFTAddress[activeChain]
  const missionControlNFTAddress = assetsAddress[activeChain]
  const { assetsContract } = useStakeNFTContracts()
  const { approveContract } = usePayment()
  const { refresh: refreshTokens } = useTokenData()
  const { refresh: refreshStakedMCNFT } = useStakeMCNFTData()

  const { createTransaction, ...contractSpec } = defineMCContract<StakedMissionControlNFTContract>('genesis-stake-contract', {
    contractAddress: stakeMCNFTAddress,
    notifications: {
      sender: 'jeremiah',
      failMessage: 'Malfunction in staking systems detected. Operations to resume shortly, agent!'
    },
    createContract: (provider) =>
      new ethers.Contract(stakeMCNFTAddress, StakedMissionControlNFTABI.abi, provider.getSigner()) as unknown as StakedMissionControlNFTContract
  })

  const stake = (stakedItems: CorporationStakeItem[]) =>
    createTransaction(async (contract) => {
      const { addressList, amountList, tokenIds } = filledLists(stakedItems, missionControlNFTAddress)

      return await contract.stakeManySemiFungible(addressList, tokenIds, amountList, 0)
    }, {
      approve: async () => approveContract(assetsContract, stakeMCNFTAddress),
      onSuccess: async () => await Promise.all([refreshTokens(), refreshStakedMCNFT()])
    })

  const unstake = (stakedItems: CorporationStakeItem[]) =>
    createTransaction(async (contract) => {
      const { addressList, amountList, tokenIds } = filledLists(stakedItems, missionControlNFTAddress)
      return await contract.unstakeMany(addressList, tokenIds, amountList, 0)
    }, {
      onSuccess: async () => await Promise.all([refreshTokens(), refreshStakedMCNFT()])
    })

  return {
    ...contractSpec,
    stakeOrUnstake: createStakeUnstakeFn(stake, unstake)
  }
}


export const useStakeMCGenesisNFT = () => {
  const activeChain = useActiveChain('ethereum')
  const genesisAddress = genesisNFTAddress[activeChain]
  const stakeMCNFTAddress = stakedMissionControlNFTAddress[activeChain]

  const { approveContract } = usePayment()

  const { createTransaction, setupContract, contract } = defineMCContract<StakedMissionControlNFTContract>('stake-contract', {
    contractAddress: stakeMCNFTAddress,
    ethereum: true,
    notifications: {
      sender: 'jeremiah',
      failMessage: 'Malfunction in staking systems detected. Operations to resume shortly, agent!'
    },
    createContract: (provider) =>
      new ethers.Contract(stakeMCNFTAddress, StakedMissionControlNFTABI.abi, provider.getSigner()) as unknown as StakedMissionControlNFTContract
  })

  const getGenesisContract = (provider: ethers.providers.Web3Provider) =>
    ref(markRaw(new ethers.Contract(genesisAddress, GenesisNFTContractABI.abi, provider.getSigner()) as unknown as GenesisNFTContract))

  const getRelayerFee = async () => {
    const credentials = useGraphqlCredentials()
    const relayerFeeString = await GqlRelayerFee({ credentials })
    return ethers.BigNumber.from(relayerFeeString.relayerFee)
  }

  const maybeInitContract = () => {
    if (contract.value)
      return

    const { provider } = useWallet()
    setupContract(provider.value)
  }

  const stake = (stakedItems: CorporationStakeItem[]) =>
    createTransaction(async () => {
      maybeInitContract()

      const { addressList, amountList, tokenIds } = filledLists(stakedItems, genesisAddress)

      const relayerFee = await getRelayerFee()

      const bumpedRelayerFee = relayerFee.mul(2)

      return await contract.value.stakeManySemiFungible(addressList, tokenIds, amountList, bumpedRelayerFee, { value: bumpedRelayerFee })
    }, {
      approve: async () => {
        const { provider } = useWallet()
        const contract = getGenesisContract(provider.value)
        return await approveContract(contract, stakeMCNFTAddress)
      }
    })

  const unstake = (stakedItems: CorporationStakeItem[]) =>
    createTransaction(async () => {
      maybeInitContract()

      const relayerFee = await getRelayerFee()

      const bumpedRelayerFee = relayerFee.mul(2)

      const { addressList, amountList, tokenIds } = filledLists(stakedItems, genesisAddress)
      return await contract.value.unstakeMany(addressList, tokenIds, amountList, bumpedRelayerFee, { value: bumpedRelayerFee })
    })

  return {
    stakeOrUnstake: createStakeUnstakeFn(stake, unstake)
  }
}
