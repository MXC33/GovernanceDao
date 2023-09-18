import { ethers } from 'ethers'
import { ContractContext as RoverContract, RepairBatchYGenesisRequest } from '../ABIs/rover'
import RoverABI from "../ABIs/rover.json"
import { CorporationRenameItem, CorporationRepairItem } from './useCorporationService'
import { CorporationShopItem, Currency } from './useCorporationShop'
import { NftFragment } from '#gql'


export const useYSpaceContracts = () => {
  const activeChain = useActiveChain()
  const roverContractAddress = roverAddress[activeChain]
  const missionControlNFTAddress = assetsAddress[activeChain]
  const { pixTokenContract, usdtManagerContract, approveMoreTokens, approveContract } = usePayment()
  const { refresh: refreshRovers } = useRoverData()
  const { refresh: refreshTokens } = useTokenData()
  const { refresh: refreshCurrencies } = useCurrencyData()

  const { refreshAllTiles } = useTileData()
  const { assetsContract } = useStakeNFTContracts()

  const { createTransaction, ...contractSpec } = defineContract<RoverContract>('rover-contract', {
    contractAddress: roverContractAddress,
    notifications: {
      sender: 'proxy-of-change',
      failMessage: 'Malfunction in staking systems detected. Operations to resume shortly, agent!'
    },
    createContract: (provider) =>
      new ethers.Contract(roverContractAddress, RoverABI.abi, provider.getSigner()) as unknown as RoverContract
  })

  const chooseApproveContract = (currency: Currency) => {
    switch (currency) {
      case 'ixt':
        return pixTokenContract
      case 'usdt':
        return usdtManagerContract
      case 'matic':
        return null
    }
  }

  enum PayableToken {
    "ixt",
    "astro-credit",
    "usdt",
    "matic",
  }

  const onRepairSuccess = async () => {
    return await Promise.all([refreshAllTiles(), refreshRovers(), refreshTokens(), refreshCurrencies()])
  }

  const getPaymentToken = (currency: Currency) => PayableToken[currency]

  const getPurchaseRoverPrice = async (contract: RoverContract, currency: Currency) => {
    return await contract.getPurchasePrice(getPaymentToken(currency))
  }

  const purchaseRover = (corporationItem: CorporationShopItem, currency: Currency) =>
    createTransaction(async (contract) => {

      const price = await getPurchaseRoverPrice(contract, currency)
      const amount = corporationItem.payment.value

      switch (currency) {
        case 'ixt':
          return await contract.purchaseWithIXT(amount)
        case 'usdt':
          return await contract.purchaseWithUSDT(amount)
        case 'matic':
          return await contract.purchaseWithMatic(amount, { value: price })
      }

    }, {
      approve: () => {
        const approvalCount = (corporationItem.price * corporationItem.payment.value * 4)
        return approveMoreTokens(approvalCount, chooseApproveContract(currency), roverContractAddress)
      },
      onSuccess: () => refreshRovers()
    })

  const repairRoverIXT = (corporationRepairItems: CorporationRepairItem[]) => {
    const repairPrice = corporationRepairItems.map(item => item.price).reduce((a, b) => a + b, 0)
    return createTransaction(async (contract) => {

      const tokenIds = corporationRepairItems.map(item => item.token.tokenId)

      return await contract.repairBatchIXT(tokenIds)

    }, {
      approve: () => approveMoreTokens(repairPrice, pixTokenContract, roverContractAddress),
      onSuccess: () => onRepairSuccess()
    })
  }

  const repairRoverAC = (corporationRepairItems: CorporationRepairItem[]) =>
    createTransaction(async (contract) => {

      const tokenIds = corporationRepairItems.map(item => item.token.tokenId)

      return await contract.repairBatchAC(tokenIds)
    }, {
      approve: () => approveContract(assetsContract, roverContractAddress),
      onSuccess: () => onRepairSuccess()
    })

  const repairRoverGenesis = (corporationRepairItems: CorporationRepairItem[]) =>
    createTransaction(async (contract) => {

      console.log("Free repair with Genesis")

      const genesisRepairInfo: RepairBatchYGenesisRequest[] = corporationRepairItems.map(item => {

        return {
          tokenId: item.token.tokenId,
          //@ts-ignore
          x: item?.token.tile?.q ?? 0,
          //@ts-ignore
          y: item?.token.tile?.r ?? 0,
          //@ts-ignore
          z: item?.token.tile?.s ?? 0
        }
      })

      return await contract.repairBatchYGenesis(genesisRepairInfo)
    }, {
      onSuccess: () => onRepairSuccess()
    })

  const setNameRoverIXT = (token: NftFragment, newName: string, newNamePrice = 25) =>
    createTransaction(async (contract) => {
      return await contract.setNameWithIXT(token.tokenId, newName)
    }, {
      approve: () => approveMoreTokens(newNamePrice, pixTokenContract, roverContractAddress),
      onSuccess: () => refreshRovers()
    })

  const setNameRoverAC = (token: NftFragment, newName: string) =>
    createTransaction(async (contract) => {

      return await contract.setNameWithAC(token.tokenId, newName)
    }, {
      approve: () => approveContract(assetsContract, roverContractAddress),
      onSuccess: () => refreshRovers()
    })


  const upgradeSkinRoverIXT = (token: NftFragment, skinId: number, skinPrice = 10) =>
    createTransaction(async (contract) => {

      return await contract.upgradeSkinIXT(token.tokenId, skinId)
    }, {
      approve: () => approveMoreTokens(skinPrice, pixTokenContract, roverContractAddress)
    })

  const upgradeSkinRoverAC = (token: NftFragment, skinId: string) =>
    createTransaction(async (contract) => {

      return await contract.upgradeSkinAC(token.tokenId, skinId)
    })


  return {
    setNameRoverAC,
    setNameRoverIXT,
    repairRoverIXT,
    repairRoverAC,
    repairRoverGenesis,
    purchaseRover,
    getPurchaseRoverPrice,
    ...contractSpec,
  }
}