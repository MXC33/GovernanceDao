import { ethers } from "ethers";
import { Sender } from './useSender';
import { ContractInterface, CreateContractOptions, TransactionOptions } from "@ix/base/composables/Utils/defineContract";

interface ContractNotificationSettings {
  sender?: Sender,
  failMessage?: string,
  successMessage?: string
}

export interface CreateMCContractOptions<T> extends CreateContractOptions<T> {
  notifications?: ContractNotificationSettings,
}

export interface MCTransactionOptions extends TransactionOptions {
  sender?: Sender,
  failMessage?: string,
  successMessage?: string
}

export const defineMCContract = <T extends ContractInterface<T>>(key: string, options: CreateMCContractOptions<T>) => {

  const { addNotification } = useNotifications()

  const notifications: ContractNotificationSettings = {
    sender: options.notifications?.sender ?? 'proxy-of-change',
    failMessage: options.notifications?.failMessage ?? 'Error processing your transactions',
    successMessage: options.notifications?.successMessage
  }

  const onEverySuccess = (txOptions?: MCTransactionOptions) => {
    const { successMessage, sender } = notifications

    const message = txOptions?.successMessage ?? successMessage
    if (message)
      addNotification(message, { sender })
  }

  const onEveryFail = (txOptions?: MCTransactionOptions, error?: string) => {
    const { sender, failMessage } = notifications
    console.log("ON FAIL")

    addNotification(txOptions?.failMessage ?? failMessage, {
      sender: txOptions?.sender ?? sender,
      errorCode: error
    })
  }

  const mcOptions: CreateContractOptions<T> = {
    ...options,
    onEveryFail,
    onEverySuccess
  }

  return defineContract(key, mcOptions)
}
