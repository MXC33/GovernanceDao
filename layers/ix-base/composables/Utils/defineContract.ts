import { EventFilter, Listener } from "@ethersproject/abstract-provider";
import { Contract, ethers } from "ethers";
import { useNotifications } from "./useNotifications";
import { useTransactions } from "./useTransaction";
import { ContractError } from "./useContractErrors";

export interface ContractInterface<T> {
  on: (event: EventFilter | string, listener: Listener) => T
}

interface ContractNotificationSettings {
  failMessage?: string,
  successMessage?: string
}

type SetupContractFn<T> = (provider: ethers.providers.Web3Provider) => T

export interface CreateContractOptions<T> {
  contractAddress: string,
  ethereum?: true,
  createContract: SetupContractFn<T | undefined>,
  listeners?: Record<string, (...args: Array<any>) => void>
  notifications?: ContractNotificationSettings,
}
// all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;


export interface TransactionOptions {
  approve?: () => Promise<unknown>,
  onSuccess?: () => Promise<any>,
  onFail?: (error?: any) => Promise<any>,
  onTxApproved?: () => Promise<any>,
  onSuccessAfterMs?: number,
  successOnEventKey?: string | string[],
  // getTransactionError?: (errorCode?: string) => ContractError
  // successMessage?: string
}

export const useDefinedContractSetups = () => {
  type SetupFn = (provider: ethers.providers.Web3Provider) => any
  const allContracts = useState<Record<string, SetupFn>>('defined-contracts', () => ({}))

  const setupAllContracts = (provider: ethers.providers.Web3Provider) =>
    Object.keys(allContracts.value).forEach((key) => {
      allContracts.value[key](provider)
    })

  const addContractSetupFn = (key: string, fn: SetupFn) => {
    if (!allContracts.value[key]) {
      allContracts.value[key] = fn
    }
  }

  return {
    addContractSetupFn,
    setupAllContracts,
    allContracts
  }
}

export const defineContract = <T extends ContractInterface<T> | object>(key: string, options: CreateContractOptions<T>) => {
  const { addContractSetupFn } = useDefinedContractSetups()
  const { provider } = useWallet()
  const contract = useState<T | null>(`contract-${key}`, () => null)
  const pendingTxEvent = useState<TransactionOptions | null>(`contract-success-key`, () => null)

  if (process.client) {
    addContractSetupFn(key, options.createContract)
  }

  const { setTransactionState, resetTransactionState } = useTransactions()
  const { addError } = useContractErrors()
  const { onTransactionResolved, ensureCorrectChain } = useWallet()
  const { contractAddress } = options

  const notifications: ContractNotificationSettings = {
    failMessage: options.notifications?.failMessage ?? 'Error processing your transactions',
    // successMessage: options.notifications?.successMessage
  }

  const { contractSenderSameAsUser } = useWallet()

  const setupContract = (provider: ethers.providers.Web3Provider) => {
    const rawContract = options.createContract(provider)
    if (!rawContract)
      return console.error("Contract not set up correctly")

    contract.value = markRaw(rawContract)

    if (options.listeners)
      createListeners(rawContract)
  }

  const keyInSuccessKey = (key: string, successKey: string | string[]) => {
    if (!successKey)
      return false

    if (Array.isArray(successKey))
      return successKey.includes(key)

    return key == successKey
  }

  const createListeners = (contract: T) => {
    const { listeners } = options
    if (!listeners)
      return
    Object.keys(listeners).forEach((eventKey: string) => {
      const listenerFn = listeners[eventKey]

      const contractCallback = async (eventKey: string, senderAddress: any, ...args: any[]) => {
        if (!pendingTxEvent.value?.successOnEventKey)
          return
        const hasSuccessKey = keyInSuccessKey(eventKey, pendingTxEvent.value?.successOnEventKey)
        if (hasSuccessKey)
          await transactionSuccess(pendingTxEvent.value)

        listenerFn(senderAddress, ...args)

      }

      const contractHasEvents = (contract: ContractInterface<T> | object): contract is ContractInterface<T> => {
        return !!(contract as ContractInterface<T>).on
      }

      if (contractHasEvents(contract)) {
        contract.on(eventKey, (senderAddress, ...args) => {
          if (!contractSenderSameAsUser(senderAddress))
            return

          contractCallback(eventKey, senderAddress, ...args)
        })
      }
    })

  }


  const transactionSuccess = async (txOptions?: TransactionOptions) => {
    // const { successMessage } = notifications

    if (txOptions?.onSuccess) {
      if (txOptions?.onSuccessAfterMs) {
        await useWait(txOptions?.onSuccessAfterMs ?? 0)
      }

      await txOptions.onSuccess()
    }

    resetTransactionState()

    // const message = txOptions?.successMessage ?? successMessage
    // if (message)
    //   addNotification(message)
  }

  const transactionFailed = async (error?: any, txOptions?: TransactionOptions) => {
    // const { failMessage } = notifications
    if (txOptions?.onFail)
      await txOptions.onFail(error)

    resetTransactionState()
    // if (txOptions?.getTransactionError) {
    //   addError(txOptions.getTransactionError(error?.message))
    // }

    console.log("FAILED TX", error)
    throw new Error(error?.message)
  }

  const beforeContractInteraction = async () => {
    console.log(provider.value)
    console.log(contract.value)

    await ensureCorrectChain(options.ethereum)
    if (!contract.value && provider.value)
      await setupContract(provider.value)
  }

  // For utility things that are not transactions
  const withContract = async (fn: (contract: T) => any) => {
    await beforeContractInteraction()
    if (contract.value)
      return fn(contract.value)
  }

  // For utility things that are not transactions
  const viewAsyncState = <P>(id: string, fn: (contract: T) => Promise<P>) => useAsyncDataState(id, async () => {
    await beforeContractInteraction()
    if (contract.value)
      return fn(contract.value)
  })

  // Default transaction methods
  const createTransaction = async (fn: (contract: T) => Promise<ethers.ContractTransaction> | undefined, txOptions?: TransactionOptions) => {
    try {
      setTransactionState('signing')

      await beforeContractInteraction()

      if (txOptions?.approve)
        await txOptions?.approve()

      setTransactionState('signing')

      if (!fn)
        return transactionFailed("No transaction", txOptions)

      if (!contract.value)
        return transactionFailed("No contract", txOptions)

      const transaction = await fn(contract.value)

      setTransactionState('minting')

      if (txOptions?.successOnEventKey)
        pendingTxEvent.value = txOptions
      else
        pendingTxEvent.value = null
      const hash = transaction?.hash

      if (!hash)
        return transactionFailed("No transaction hash", txOptions)

      const resolvedTransaction = await onTransactionResolved(hash)
      console.log("Resolved", resolvedTransaction)

      //@ts-ignore
      if (resolvedTransaction.status == 0)
        throw new Error("Transaction failed. Try increasing the gas manually.")

      if (txOptions?.onTxApproved)
        await txOptions?.onTxApproved()

      if (!pendingTxEvent.value)
        await transactionSuccess(txOptions)
      else
        setTransactionState('extracting')

      return true

    } catch (error) {
      await transactionFailed(error, txOptions)
      return false
    }
  }

  return {
    contract,
    contractAddress,
    viewAsyncState,
    withContract,
    setupContract,
    createTransaction
  }
}
