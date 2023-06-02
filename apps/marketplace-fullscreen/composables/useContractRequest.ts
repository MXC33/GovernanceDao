import { ContractError } from "@ix/base/composables/Utils/useContractErrors"

export const useContractRequest = (fn: () => Promise<any>, errorOptions: ContractError) => {
  const { addError } = useContractErrors()
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    try {
      await fn()
      return true
    } catch (error) {
      //@ts-ignore
      const message: string = error?.message

      addError({
        ...errorOptions,
        serverError: message
      })

      return false
    }
    loading.value = false
  }

  return {
    execute,
    loading
  }
}