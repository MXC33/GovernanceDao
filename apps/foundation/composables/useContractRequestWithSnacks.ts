
export const useContractRequestFnd = <T extends any[]>(fn: (...args: T) => Promise<any>) => {
  const { maybeShowContractError } = useContractRequest()

  return useContractRequest(fn, { onError: maybeShowContractError })
}
