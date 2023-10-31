import { PolygonScanTransactionsFragment } from "#gql"

export const useChainTransactions = () => {

  const catRaffTransactions = () =>
    useAsyncDataState('cat-raff-transactions-data', async () => {
      const transactions = await GqlCatRaffTransactions()
      return transactions.catRaffTransactions as PolygonScanTransactionsFragment[]
    })

  const userIxtTransactions = () =>
    useAsyncDataState('user-ixt-transactions-data', async () => {
      const credentials = useGraphqlCredentials()
      if (!credentials)
        return []
      const transactions = await GqlUserIxtTransactions({ credentials })
      return transactions.userIxtTransactions as PolygonScanTransactionsFragment[]
    })

  return {
    catRaffTransactions,
    userIxtTransactions
  }
}