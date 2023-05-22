import { AnyToken } from "./useTokens";

export const useTokenName = async (token: AnyToken, notFromChain?: boolean) => {
  const { getTokenName } = useTokens()

  if (!isIXToken(token)) {
    const { execute: fetchTokenData } = useTokenInfo(token)
    await fetchTokenData()
  }

  return getTokenName(token, !notFromChain)
}