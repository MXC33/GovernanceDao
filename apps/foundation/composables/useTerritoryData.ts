import { CredentialsInput } from "#gql"

export const useTerritoryData = () =>
  useAsyncDataState('all-territory-data', async () => {
    const credentials = useGraphqlCredentials()

    // const credentials: CredentialsInput = {
    //   playerId: 0,
    //   walletAddress: "0x259b74693B732CC5591827170F625ea6De4a559F"
    // }
    if (!credentials)
      return []
    const territories = await GqlAllUserTerritories({ credentials })
    return territories.allUserTerritories
  })
