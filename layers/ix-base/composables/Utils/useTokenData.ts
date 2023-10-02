const TOKENS_KEY = 'user-nft-tokens'

export const useTokenData = () =>
  useAsyncDataState(TOKENS_KEY, async () => {
    const credentials = useGraphqlCredentials()
    if (!credentials)
      return

    const tokens = await GqlTokens({ credentials })
    return tokens.missionControlTokens
  })

