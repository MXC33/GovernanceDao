import { getSdk as defaultGqlSdk } from '#gql/default'
export { CredentialsInput, PageKeyInput, StakingTypes, TileInput, TokenInput, AuthedQueryVariables, AuthedQuery, PlayerBaseLevelQueryVariables, PlayerBaseLevelQuery, BaseLevelCapacitiesQueryVariables, BaseLevelCapacitiesQuery, CorporationCapacityFragment, BurnedAvatarQueryVariables, BurnedAvatarQuery, GlobalWasteSystemOrderInfoQueryVariables, GlobalWasteSystemOrderInfoQuery, EternaLabsOrderInfoQueryVariables, EternaLabsOrderInfoQuery, NewLandsOrderInfoQueryVariables, NewLandsOrderInfoQuery, FacilityUpgradeOrderInfoQueryVariables, FacilityUpgradeOrderInfoQuery, MetamodFusionOrderInfoQueryVariables, MetamodFusionOrderInfoQuery, FacilityUpgradeCooldownQueryVariables, FacilityUpgradeCooldownQuery, GlobalWasteSystemOrderCostsQueryVariables, GlobalWasteSystemOrderCostsQuery, EternaLabsOrderCostsQueryVariables, EternaLabsOrderCostsQuery, NewLandsOrderCostsQueryVariables, NewLandsOrderCostsQuery, FacilityUpgradeOrderCostsQueryVariables, FacilityUpgradeOrderCostsQuery, MetamodFusionOrderCostsQueryVariables, MetamodFusionOrderCostsQuery, AssetConverterRecipesQueryVariables, AssetConverterRecipesQuery, OrderFragment, OrderDataFragment, TaxFragment, OrderCostFragment, ProbabilityWeightFragment, AssetConverterRecipeFragment, GravityGradeNftBalanceQueryVariables, GravityGradeNftBalanceQuery, IsGgEligibleQueryVariables, IsGgEligibleQuery, GgPackContentQueryVariables, GgPackContentQuery, SaleInfoQueryVariables, SaleInfoQuery, GenericStoreSaleInfoFragment, TokenProbabilityFragment, LandQueryVariables, LandQuery, LandmarksQueryVariables, LandmarksQuery, LuckyCatRaffleQueryVariables, LuckyCatRaffleQuery, LuckyCatRaffleFragment, RaffleInfoFragment, WinningsFragment, DailyTicketsFragment, PrizeFragment, PrizeItemFragment, UniqueLandWithInfoQueryVariables, UniqueLandWithInfoQuery, UniquePixWithInfoFromIdQueryVariables, UniquePixWithInfoFromIdQuery, PixResultsFragment, PageKeyFragment, RelayerFeeQueryVariables, RelayerFeeQuery, StakedOnTileQueryVariables, StakedOnTileQuery, OldStakedOnTileQueryVariables, OldStakedOnTileQuery, WasteNonceQueryVariables, WasteNonceQuery, OldWasteNonceQueryVariables, OldWasteNonceQuery, TileFragment, StakedNftFragment, StakedPixInfoFragment, StakedTopAssetInfoFragment, StakedMcnftQueryVariables, StakedMcnftQuery, StakedGenesisNftQueryVariables, StakedGenesisNftQuery, StakedGenesisNftEthQueryVariables, StakedGenesisNftEthQuery, StakedMcnftInfoFragment, CurrenciesQueryVariables, CurrenciesQuery, StakingDataQueryVariables, StakingDataQuery, CatRaffAccountsQueryVariables, CatRaffAccountsQuery, CatRaffPastPrizesQueryVariables, CatRaffPastPrizesQuery, CatRaffWeeklyQueryVariables, CatRaffWeeklyQuery, TotalFacilitiesMintedQueryVariables, TotalFacilitiesMintedQuery, CatRaffTicketInfoFragment, StakingDataFragment, WeeklyTicketDataFragment, UserSpecificStakingDataFragment, TokenSpecificUserStakingDataFragment, StakingItemFragment, EnergyStakedAtFragment, TokensQueryVariables, TokensQuery, EthNfTsQueryVariables, EthNfTsQuery, RoversQueryVariables, RoversQuery, AvatarNftQueryVariables, AvatarNftQuery, GeoLotteryNftQueryVariables, GeoLotteryNftQuery, TokenInfoQueryVariables, TokenInfoQuery, TokenInfoTypeTierQueryVariables, TokenInfoTypeTierQuery, BadgeNftQueryVariables, BadgeNftQuery, AllUserTerritoriesQueryVariables, AllUserTerritoriesQuery, NftFragment, TokenInfoFragment, AttributeFragment, MediaFragment, MintInfoFragment, CatRaffTransactionsQueryVariables, CatRaffTransactionsQuery, UserIxtTransactionsQueryVariables, UserIxtTransactionsQuery, PolygonScanTransactionsFragment } from "#gql/default";
declare module '#gql' {
  type GqlClients = 'default'
  type GqlOps = 'Authed' | 'PlayerBaseLevel' | 'BaseLevelCapacities' | 'CorporationCapacity' | 'BurnedAvatar' | 'GlobalWasteSystemOrderInfo' | 'EternaLabsOrderInfo' | 'NewLandsOrderInfo' | 'FacilityUpgradeOrderInfo' | 'MetamodFusionOrderInfo' | 'FacilityUpgradeCooldown' | 'GlobalWasteSystemOrderCosts' | 'EternaLabsOrderCosts' | 'NewLandsOrderCosts' | 'FacilityUpgradeOrderCosts' | 'MetamodFusionOrderCosts' | 'AssetConverterRecipes' | 'Order' | 'OrderData' | 'Tax' | 'OrderCost' | 'ProbabilityWeight' | 'AssetConverterRecipe' | 'GravityGradeNFTBalance' | 'IsGGEligible' | 'GGPackContent' | 'SaleInfo' | 'GenericStoreSaleInfo' | 'TokenProbability' | 'Land' | 'Landmarks' | 'LuckyCatRaffle' | 'RaffleInfo' | 'Winnings' | 'DailyTickets' | 'Prize' | 'PrizeItem' | 'UniqueLandWithInfo' | 'UniquePixWithInfoFromId' | 'PageKeyInput' | 'PixResults' | 'PageKey' | 'RelayerFee' | 'StakedOnTile' | 'OldStakedOnTile' | 'WasteNonce' | 'OldWasteNonce' | 'Tile' | 'StakedNFT' | 'StakedPixInfo' | 'StakedTopAssetInfo' | 'StakedMCNFT' | 'StakedGenesisNFT' | 'StakedGenesisNFTEth' | 'StakedMCNFTInfo' | 'Currencies' | 'StakingData' | 'CatRaffAccounts' | 'CatRaffPastPrizes' | 'CatRaffWeekly' | 'TotalFacilitiesMinted' | 'CatRaffTicketInfo' | 'StakingId' | 'WeeklyTicketData' | 'UserSpecificStakingData' | 'TokenSpecificUserStakingData' | 'StakingItem' | 'EnergyStakedAt' | 'Tokens' | 'EthNFTs' | 'Rovers' | 'AvatarNFT' | 'GeoLotteryNFT' | 'TokenInfo' | 'TokenInfoTypeTier' | 'badgeNFT' | 'AllUserTerritories' | 'NFT' | 'Attribute' | 'Media' | 'MintInfo' | 'TokenInput' | 'CatRaffTransactions' | 'UserIxtTransactions' | 'PolygonScanTransactions'
  const GqClientOps = {"default":["Authed","PlayerBaseLevel","BaseLevelCapacities","CorporationCapacity","BurnedAvatar","GlobalWasteSystemOrderInfo","EternaLabsOrderInfo","NewLandsOrderInfo","FacilityUpgradeOrderInfo","MetamodFusionOrderInfo","FacilityUpgradeCooldown","GlobalWasteSystemOrderCosts","EternaLabsOrderCosts","NewLandsOrderCosts","FacilityUpgradeOrderCosts","MetamodFusionOrderCosts","AssetConverterRecipes","Order","OrderData","Tax","OrderCost","ProbabilityWeight","AssetConverterRecipe","GravityGradeNFTBalance","IsGGEligible","GGPackContent","SaleInfo","GenericStoreSaleInfo","TokenProbability","Land","Landmarks","LuckyCatRaffle","RaffleInfo","Winnings","DailyTickets","Prize","PrizeItem","UniqueLandWithInfo","UniquePixWithInfoFromId","PageKeyInput","PixResults","PageKey","RelayerFee","StakedOnTile","OldStakedOnTile","WasteNonce","OldWasteNonce","Tile","StakedNFT","StakedPixInfo","StakedTopAssetInfo","StakedMCNFT","StakedGenesisNFT","StakedGenesisNFTEth","StakedMCNFTInfo","Currencies","StakingData","CatRaffAccounts","CatRaffPastPrizes","CatRaffWeekly","TotalFacilitiesMinted","CatRaffTicketInfo","StakingId","WeeklyTicketData","UserSpecificStakingData","TokenSpecificUserStakingData","StakingItem","EnergyStakedAt","Tokens","EthNFTs","Rovers","AvatarNFT","GeoLotteryNFT","TokenInfo","TokenInfoTypeTier","badgeNFT","AllUserTerritories","NFT","Attribute","Media","MintInfo","TokenInput","CatRaffTransactions","UserIxtTransactions","PolygonScanTransactions"]}
  const GqlSdks = {
    default: defaultGqlSdk,
  }
  export const GqlAllUserTerritories: (...params: Parameters<GqlSdkFuncs['AllUserTerritories']>) => ReturnType<GqlSdkFuncs['AllUserTerritories']>
  export const GqlAssetConverterRecipes: (...params: Parameters<GqlSdkFuncs['AssetConverterRecipes']>) => ReturnType<GqlSdkFuncs['AssetConverterRecipes']>
  export const GqlAuthed: (...params: Parameters<GqlSdkFuncs['Authed']>) => ReturnType<GqlSdkFuncs['Authed']>
  export const GqlAvatarNFT: (...params: Parameters<GqlSdkFuncs['AvatarNFT']>) => ReturnType<GqlSdkFuncs['AvatarNFT']>
  export const GqlBaseLevelCapacities: (...params: Parameters<GqlSdkFuncs['BaseLevelCapacities']>) => ReturnType<GqlSdkFuncs['BaseLevelCapacities']>
  export const GqlBurnedAvatar: (...params: Parameters<GqlSdkFuncs['BurnedAvatar']>) => ReturnType<GqlSdkFuncs['BurnedAvatar']>
  export const GqlCatRaffAccounts: (...params: Parameters<GqlSdkFuncs['CatRaffAccounts']>) => ReturnType<GqlSdkFuncs['CatRaffAccounts']>
  export const GqlCatRaffPastPrizes: (...params: Parameters<GqlSdkFuncs['CatRaffPastPrizes']>) => ReturnType<GqlSdkFuncs['CatRaffPastPrizes']>
  export const GqlCatRaffTransactions: (...params: Parameters<GqlSdkFuncs['CatRaffTransactions']>) => ReturnType<GqlSdkFuncs['CatRaffTransactions']>
  export const GqlCatRaffWeekly: (...params: Parameters<GqlSdkFuncs['CatRaffWeekly']>) => ReturnType<GqlSdkFuncs['CatRaffWeekly']>
  export const GqlCurrencies: (...params: Parameters<GqlSdkFuncs['Currencies']>) => ReturnType<GqlSdkFuncs['Currencies']>
  export const GqlEternaLabsOrderCosts: (...params: Parameters<GqlSdkFuncs['EternaLabsOrderCosts']>) => ReturnType<GqlSdkFuncs['EternaLabsOrderCosts']>
  export const GqlEternaLabsOrderInfo: (...params: Parameters<GqlSdkFuncs['EternaLabsOrderInfo']>) => ReturnType<GqlSdkFuncs['EternaLabsOrderInfo']>
  export const GqlEthNFTs: (...params: Parameters<GqlSdkFuncs['EthNFTs']>) => ReturnType<GqlSdkFuncs['EthNFTs']>
  export const GqlFacilityUpgradeCooldown: (...params: Parameters<GqlSdkFuncs['FacilityUpgradeCooldown']>) => ReturnType<GqlSdkFuncs['FacilityUpgradeCooldown']>
  export const GqlFacilityUpgradeOrderCosts: (...params: Parameters<GqlSdkFuncs['FacilityUpgradeOrderCosts']>) => ReturnType<GqlSdkFuncs['FacilityUpgradeOrderCosts']>
  export const GqlFacilityUpgradeOrderInfo: (...params: Parameters<GqlSdkFuncs['FacilityUpgradeOrderInfo']>) => ReturnType<GqlSdkFuncs['FacilityUpgradeOrderInfo']>
  export const GqlGGPackContent: (...params: Parameters<GqlSdkFuncs['GGPackContent']>) => ReturnType<GqlSdkFuncs['GGPackContent']>
  export const GqlGeoLotteryNFT: (...params: Parameters<GqlSdkFuncs['GeoLotteryNFT']>) => ReturnType<GqlSdkFuncs['GeoLotteryNFT']>
  export const GqlGlobalWasteSystemOrderCosts: (...params: Parameters<GqlSdkFuncs['GlobalWasteSystemOrderCosts']>) => ReturnType<GqlSdkFuncs['GlobalWasteSystemOrderCosts']>
  export const GqlGlobalWasteSystemOrderInfo: (...params: Parameters<GqlSdkFuncs['GlobalWasteSystemOrderInfo']>) => ReturnType<GqlSdkFuncs['GlobalWasteSystemOrderInfo']>
  export const GqlGravityGradeNFTBalance: (...params: Parameters<GqlSdkFuncs['GravityGradeNFTBalance']>) => ReturnType<GqlSdkFuncs['GravityGradeNFTBalance']>
  export const GqlIsGGEligible: (...params: Parameters<GqlSdkFuncs['IsGGEligible']>) => ReturnType<GqlSdkFuncs['IsGGEligible']>
  export const GqlLand: (...params: Parameters<GqlSdkFuncs['Land']>) => ReturnType<GqlSdkFuncs['Land']>
  export const GqlLandmarks: (...params: Parameters<GqlSdkFuncs['Landmarks']>) => ReturnType<GqlSdkFuncs['Landmarks']>
  export const GqlLuckyCatRaffle: (...params: Parameters<GqlSdkFuncs['LuckyCatRaffle']>) => ReturnType<GqlSdkFuncs['LuckyCatRaffle']>
  export const GqlMetamodFusionOrderCosts: (...params: Parameters<GqlSdkFuncs['MetamodFusionOrderCosts']>) => ReturnType<GqlSdkFuncs['MetamodFusionOrderCosts']>
  export const GqlMetamodFusionOrderInfo: (...params: Parameters<GqlSdkFuncs['MetamodFusionOrderInfo']>) => ReturnType<GqlSdkFuncs['MetamodFusionOrderInfo']>
  export const GqlNewLandsOrderCosts: (...params: Parameters<GqlSdkFuncs['NewLandsOrderCosts']>) => ReturnType<GqlSdkFuncs['NewLandsOrderCosts']>
  export const GqlNewLandsOrderInfo: (...params: Parameters<GqlSdkFuncs['NewLandsOrderInfo']>) => ReturnType<GqlSdkFuncs['NewLandsOrderInfo']>
  export const GqlOldStakedOnTile: (...params: Parameters<GqlSdkFuncs['OldStakedOnTile']>) => ReturnType<GqlSdkFuncs['OldStakedOnTile']>
  export const GqlOldWasteNonce: (...params: Parameters<GqlSdkFuncs['OldWasteNonce']>) => ReturnType<GqlSdkFuncs['OldWasteNonce']>
  export const GqlPlayerBaseLevel: (...params: Parameters<GqlSdkFuncs['PlayerBaseLevel']>) => ReturnType<GqlSdkFuncs['PlayerBaseLevel']>
  export const GqlRelayerFee: (...params: Parameters<GqlSdkFuncs['RelayerFee']>) => ReturnType<GqlSdkFuncs['RelayerFee']>
  export const GqlRovers: (...params: Parameters<GqlSdkFuncs['Rovers']>) => ReturnType<GqlSdkFuncs['Rovers']>
  export const GqlSaleInfo: (...params: Parameters<GqlSdkFuncs['SaleInfo']>) => ReturnType<GqlSdkFuncs['SaleInfo']>
  export const GqlStakedGenesisNFT: (...params: Parameters<GqlSdkFuncs['StakedGenesisNFT']>) => ReturnType<GqlSdkFuncs['StakedGenesisNFT']>
  export const GqlStakedGenesisNFTEth: (...params: Parameters<GqlSdkFuncs['StakedGenesisNFTEth']>) => ReturnType<GqlSdkFuncs['StakedGenesisNFTEth']>
  export const GqlStakedMCNFT: (...params: Parameters<GqlSdkFuncs['StakedMCNFT']>) => ReturnType<GqlSdkFuncs['StakedMCNFT']>
  export const GqlStakedOnTile: (...params: Parameters<GqlSdkFuncs['StakedOnTile']>) => ReturnType<GqlSdkFuncs['StakedOnTile']>
  export const GqlStakingData: (...params: Parameters<GqlSdkFuncs['StakingData']>) => ReturnType<GqlSdkFuncs['StakingData']>
  export const GqlTokenInfo: (...params: Parameters<GqlSdkFuncs['TokenInfo']>) => ReturnType<GqlSdkFuncs['TokenInfo']>
  export const GqlTokenInfoTypeTier: (...params: Parameters<GqlSdkFuncs['TokenInfoTypeTier']>) => ReturnType<GqlSdkFuncs['TokenInfoTypeTier']>
  export const GqlTokens: (...params: Parameters<GqlSdkFuncs['Tokens']>) => ReturnType<GqlSdkFuncs['Tokens']>
  export const GqlTotalFacilitiesMinted: (...params: Parameters<GqlSdkFuncs['TotalFacilitiesMinted']>) => ReturnType<GqlSdkFuncs['TotalFacilitiesMinted']>
  export const GqlUniqueLandWithInfo: (...params: Parameters<GqlSdkFuncs['UniqueLandWithInfo']>) => ReturnType<GqlSdkFuncs['UniqueLandWithInfo']>
  export const GqlUniquePixWithInfoFromId: (...params: Parameters<GqlSdkFuncs['UniquePixWithInfoFromId']>) => ReturnType<GqlSdkFuncs['UniquePixWithInfoFromId']>
  export const GqlUserIxtTransactions: (...params: Parameters<GqlSdkFuncs['UserIxtTransactions']>) => ReturnType<GqlSdkFuncs['UserIxtTransactions']>
  export const GqlWasteNonce: (...params: Parameters<GqlSdkFuncs['WasteNonce']>) => ReturnType<GqlSdkFuncs['WasteNonce']>
  export const GqlBadgeNFT: (...params: Parameters<GqlSdkFuncs['badgeNFT']>) => ReturnType<GqlSdkFuncs['badgeNFT']>
  type GqlSdkFuncs = ReturnType<typeof defaultGqlSdk>
}