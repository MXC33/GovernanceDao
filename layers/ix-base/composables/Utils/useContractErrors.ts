import { AnyToken } from "../Token/useTokens"

export interface ContractError {
  title: string,
  description?: string,
  serverError?: string,
  items?: AnyToken[]
}

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