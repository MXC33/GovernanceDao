import { ethers } from "ethers";
import { Corporation } from "../useCorporations"
import { NftFragment } from "#gql";
import { CreateMCContractOptions } from "composables/defineContract";
import { ContractInterface } from "@ix/base/composables/Utils/defineContract";

export interface SpeedupTransaction {
  orderId?: number,
  numberOfSpeedups: number,
  payType: NftFragment,
  price?: number,
}

export interface CraftContractSpeedupConfig<T> {
  ixt: (contract: T, speedup: SpeedupTransaction) => Promise<ethers.ContractTransaction>
  astro: (contract: T, speedup: SpeedupTransaction) => Promise<ethers.ContractTransaction>
  ixtAll?: (contract: T, speedup: SpeedupTransaction) => Promise<ethers.ContractTransaction>
  astroAll?: (contract: T, speedup: SpeedupTransaction) => Promise<ethers.ContractTransaction>
}

interface OrderContractOptions<T> extends CreateMCContractOptions<T> {
  speedup: CraftContractSpeedupConfig<T>,
  claimSuccessEvent: string,
  claim: (contract: T, orderId: number) => Promise<ethers.ContractTransaction>
  place: (contract: T) => Promise<ethers.ContractTransaction>
  claimAll: (contract: T) => Promise<ethers.ContractTransaction>
}

export type OrderTaskId = 'craft' | 'upgrade' | 'fusion'

export interface CorporationOrderId {
  type: Corporation,
  task: OrderTaskId
}

const IXT_MIN_APPROVE = 20

export const useCorporationOrderId = () => {
  const getOrderKey = ({ type, task }: CorporationOrderId) =>
    `${type}-${task}`

  return {
    getOrderKey
  }
}

export const defineOrderContract = <T extends ContractInterface<T>>(corporationId: CorporationOrderId, options: OrderContractOptions<T>) => {
  const { getOrderKey } = useCorporationOrderId()
  const corporationOrderKey = getOrderKey(corporationId)
  const definedContract = defineMCContract(corporationOrderKey, options)
  const { contractAddress, contract, createTransaction } = definedContract
  const { refreshOrderData, activeSpeedupOrder } = useCorporationOrders()
  const { refresh: refreshCurrencies } = useCurrencyData()
  const { refresh: refreshTokens } = useTokenData()

  const { pixTokenContract } = usePayment()

  const speedupOrder = (transaction: SpeedupTransaction) =>
    createTransaction(() => speedup(transaction), {
      approve: () => approveSpeedup(transaction),
      onSuccess: async () => {
        activeSpeedupOrder.value = null

        await Promise.all([refreshOrderData(corporationId), refreshCurrencies()])

        return true
      },
    })

  const speedupAllOrders = (transaction: SpeedupTransaction) =>
    createTransaction(() => speedupAll(transaction), {
      approve: () => approveAllSpeedups(transaction),
      onSuccess: async () => {
        activeSpeedupOrder.value = null
        await Promise.all([refreshOrderData(corporationId), refreshCurrencies()])
      },
    })

  const approveSpeedup = async (transaction: SpeedupTransaction): Promise<any> => {
    const { approveMoreTokens } = usePayment()

    if (transaction.payType.tokenInfo.type == 'ixt')
      return approveMoreTokens(Math.ceil(transaction.price * transaction.numberOfSpeedups), pixTokenContract, contractAddress)

    return true
  }

  const approveAllSpeedups = async (transaction: SpeedupTransaction): Promise<any> => {
    const { approveMoreTokens } = usePayment()

    if (transaction.payType.tokenInfo.type == 'ixt')
      return approveMoreTokens(Math.ceil(transaction.price * transaction.numberOfSpeedups), pixTokenContract, contractAddress)

    return true
  }

  const speedup = (transaction: SpeedupTransaction): Promise<ethers.ContractTransaction> => {
    if (transaction.payType?.tokenInfo.type == 'astro-credit') {
      return options.speedup.astro(contract.value, transaction)
    } else if (transaction.payType?.tokenInfo.type == 'ixt') {
      return options.speedup.ixt(contract.value, transaction)
    }
  }

  const speedupAll = (transaction: SpeedupTransaction): Promise<ethers.ContractTransaction> => {
    if (transaction.payType?.tokenInfo.type == 'astro-credit') {
      return options.speedup.astroAll(contract.value, transaction)
    } else if (transaction.payType?.tokenInfo.type == 'ixt') {
      return options.speedup.ixtAll(contract.value, transaction)
    }
  }

  const placeOrder = async () =>
    createTransaction(() => options.place(contract.value), {
      onSuccess: async () => {
        return Promise.all([refreshOrderData(corporationId), refreshTokens()])
      },
    })

  const claimOrder = async (orderId: number) =>
    createTransaction(() => options.claim(contract.value, orderId), {
      successOnEventKey: options.claimSuccessEvent,
      onTxApproved: () => refreshOrderData(corporationId),
      onSuccess: async () => {
        return refreshTokens()
      },
    })

  const claimBatchOrder = async () =>
    createTransaction(() => options.claimAll(contract.value), {
      successOnEventKey: options.claimSuccessEvent,
      onTxApproved: () => refreshOrderData(corporationId),
      onSuccess: async () => {
        return refreshTokens()
      },
    })

  return {
    ...definedContract,
    placeOrder,
    claimOrder,
    speedupOrder,
    speedupAllOrders,
    claimBatchOrder
  }
}
