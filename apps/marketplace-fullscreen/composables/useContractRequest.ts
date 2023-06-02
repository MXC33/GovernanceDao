import { ContractError } from "@ix/base/composables/Utils/useContractErrors"

export const useContractRequest = (fn: () => Promise<any>, errorOptions?: ContractError) => {
  const { addError } = useContractErrors()
  const loading = ref(false)

  const execute = async () => {
    loading.value = true
    try {
      await fn()
    } catch (error) {
      //@ts-ignore
      const message: string = error?.message

      console.log("ERR", error)
      if (errorOptions)
        addError({
          ...errorOptions,
          serverError: message
        })

      loading.value = false
      return false
    }

    loading.value = false
    return true
  }

  return {
    execute,
    loading
  }
}