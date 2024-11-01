import { getSdk as defaultGqlSdk } from '#gql/default'
export { CredentialsInput, PageKeyInput, StakingTypes, TileInput, TokenInput, AuthedQueryVariables, AuthedQuery, CurrenciesQueryVariables, CurrenciesQuery, StakingDataQueryVariables, StakingDataQuery, CatRaffAccountsQueryVariables, CatRaffAccountsQuery, CatRaffPastPrizesQueryVariables, CatRaffPastPrizesQuery, CatRaffWeeklyQueryVariables, CatRaffWeeklyQuery, TotalFacilitiesMintedQueryVariables, TotalFacilitiesMintedQuery, CatRaffTicketInfoFragment, StakingDataFragment, WeeklyTicketDataFragment, UserSpecificStakingDataFragment, TokenSpecificUserStakingDataFragment, StakingItemFragment, EnergyStakedAtFragment, TokensQueryVariables, TokensQuery, EthNfTsQueryVariables, EthNfTsQuery, RoversQueryVariables, RoversQuery, AvatarNftQueryVariables, AvatarNftQuery, GeoLotteryNftQueryVariables, GeoLotteryNftQuery, TokenInfoQueryVariables, TokenInfoQuery, TokenInfoTypeTierQueryVariables, TokenInfoTypeTierQuery, BadgeNftQueryVariables, BadgeNftQuery, AllUserTerritoriesQueryVariables, AllUserTerritoriesQuery, NftFragment, TokenInfoFragment, AttributeFragment, MediaFragment, MintInfoFragment, CatRaffTransactionsQueryVariables, CatRaffTransactionsQuery, UserIxtTransactionsQueryVariables, UserIxtTransactionsQuery, PolygonScanTransactionsFragment } from "#gql/default";
declare module '#gql' {
  type GqlClients = 'default'
  type GqlOps = 'Authed' | 'Currencies' | 'StakingData' | 'CatRaffAccounts' | 'CatRaffPastPrizes' | 'CatRaffWeekly' | 'TotalFacilitiesMinted' | 'CatRaffTicketInfo' | 'StakingId' | 'WeeklyTicketData' | 'UserSpecificStakingData' | 'TokenSpecificUserStakingData' | 'StakingItem' | 'EnergyStakedAt' | 'Tokens' | 'EthNFTs' | 'Rovers' | 'AvatarNFT' | 'GeoLotteryNFT' | 'TokenInfo' | 'TokenInfoTypeTier' | 'badgeNFT' | 'AllUserTerritories' | 'NFT' | 'Attribute' | 'Media' | 'MintInfo' | 'TokenInput' | 'CatRaffTransactions' | 'UserIxtTransactions' | 'PolygonScanTransactions'
  const GqClientOps = {"default":["Authed","Currencies","StakingData","CatRaffAccounts","CatRaffPastPrizes","CatRaffWeekly","TotalFacilitiesMinted","CatRaffTicketInfo","StakingId","WeeklyTicketData","UserSpecificStakingData","TokenSpecificUserStakingData","StakingItem","EnergyStakedAt","Tokens","EthNFTs","Rovers","AvatarNFT","GeoLotteryNFT","TokenInfo","TokenInfoTypeTier","badgeNFT","AllUserTerritories","NFT","Attribute","Media","MintInfo","TokenInput","CatRaffTransactions","UserIxtTransactions","PolygonScanTransactions"]}
  const GqlSdks = {
    default: defaultGqlSdk,
  }
  export const GqlAllUserTerritories: (...params: Parameters<GqlSdkFuncs['AllUserTerritories']>) => ReturnType<GqlSdkFuncs['AllUserTerritories']>
  export const GqlAuthed: (...params: Parameters<GqlSdkFuncs['Authed']>) => ReturnType<GqlSdkFuncs['Authed']>
  export const GqlAvatarNFT: (...params: Parameters<GqlSdkFuncs['AvatarNFT']>) => ReturnType<GqlSdkFuncs['AvatarNFT']>
  export const GqlCatRaffAccounts: (...params: Parameters<GqlSdkFuncs['CatRaffAccounts']>) => ReturnType<GqlSdkFuncs['CatRaffAccounts']>
  export const GqlCatRaffPastPrizes: (...params: Parameters<GqlSdkFuncs['CatRaffPastPrizes']>) => ReturnType<GqlSdkFuncs['CatRaffPastPrizes']>
  export const GqlCatRaffTransactions: (...params: Parameters<GqlSdkFuncs['CatRaffTransactions']>) => ReturnType<GqlSdkFuncs['CatRaffTransactions']>
  export const GqlCatRaffWeekly: (...params: Parameters<GqlSdkFuncs['CatRaffWeekly']>) => ReturnType<GqlSdkFuncs['CatRaffWeekly']>
  export const GqlCurrencies: (...params: Parameters<GqlSdkFuncs['Currencies']>) => ReturnType<GqlSdkFuncs['Currencies']>
  export const GqlEthNFTs: (...params: Parameters<GqlSdkFuncs['EthNFTs']>) => ReturnType<GqlSdkFuncs['EthNFTs']>
  export const GqlGeoLotteryNFT: (...params: Parameters<GqlSdkFuncs['GeoLotteryNFT']>) => ReturnType<GqlSdkFuncs['GeoLotteryNFT']>
  export const GqlRovers: (...params: Parameters<GqlSdkFuncs['Rovers']>) => ReturnType<GqlSdkFuncs['Rovers']>
  export const GqlStakingData: (...params: Parameters<GqlSdkFuncs['StakingData']>) => ReturnType<GqlSdkFuncs['StakingData']>
  export const GqlTokenInfo: (...params: Parameters<GqlSdkFuncs['TokenInfo']>) => ReturnType<GqlSdkFuncs['TokenInfo']>
  export const GqlTokenInfoTypeTier: (...params: Parameters<GqlSdkFuncs['TokenInfoTypeTier']>) => ReturnType<GqlSdkFuncs['TokenInfoTypeTier']>
  export const GqlTokens: (...params: Parameters<GqlSdkFuncs['Tokens']>) => ReturnType<GqlSdkFuncs['Tokens']>
  export const GqlTotalFacilitiesMinted: (...params: Parameters<GqlSdkFuncs['TotalFacilitiesMinted']>) => ReturnType<GqlSdkFuncs['TotalFacilitiesMinted']>
  export const GqlUserIxtTransactions: (...params: Parameters<GqlSdkFuncs['UserIxtTransactions']>) => ReturnType<GqlSdkFuncs['UserIxtTransactions']>
  export const GqlBadgeNFT: (...params: Parameters<GqlSdkFuncs['badgeNFT']>) => ReturnType<GqlSdkFuncs['badgeNFT']>
  type GqlSdkFuncs = ReturnType<typeof defaultGqlSdk>
}