import { IXToken, Sale } from "../Token/useIXToken"
import { AnyToken } from "../Token/useTokens"
import { MaybeRef } from 'vue'


interface TokenWithSale {
  token: AnyToken,
  sale?: Sale
}

export interface ContractError {
  title: string,
  description?: string,
  serverError?: string,
  items?: MaybeRef<TokenWithSale[]>
}


export const CustomErrors = {
  insufficientBalance: "Your balance is insufficient",
  allowanceError: "Allowance failed",
  approvalError: "Approve didn't work",
  invalidIXTPrice: "No IXT price set",
  noPurchaseItem: "Missing item to purchase",
  noWallet: "No wallet active",
  unknownError: "Something went wrong",

  ticketPriceError: "getting Ticket price went wrong",

} as const

export const useContractErrors = () => {
  const errors = useState<ContractError[]>('contract-errors', () => [])

  const addError = (error: ContractError) => {
    errors.value.push(error)
  }

  const markAllNotificationsRead = () => {
    errors.value.pop()
  }

  const activeError = computed(() => {
    if (errors.value.length > 0)
      return errors.value[0]
  })

  return {
    activeError,
    errors,
    addError,
    markAllNotificationsRead,
  }
}
