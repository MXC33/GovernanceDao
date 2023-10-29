
export const useCatRaffAccounts = (skip?: number) => {
  const key = `cat-raff-accounts-${skip}`
  return useAsyncDataState(key, async () => {
    const accounts = await GqlCatRaffAccounts({ skip })
    return accounts.catRaffAccounts
  })
}

export const useCatRaffPrizes = (skip?: number) => {
  const key = `cat-raff-prizes-${skip}`
  return useAsyncDataState(key, async () => {
    const prizes = await GqlCatRaffPastPrizes({ skip })
    return prizes.catRaffPastPrizes
  })
}

export const useCatRaffWeekly = () =>
  useAsyncDataState('cat-raff-weekly', async () => {
    const credentials = useGraphqlCredentials()
    const weekly = await GqlCatRaffWeekly({ credentials })
    return weekly.catRaffWeekly
  })