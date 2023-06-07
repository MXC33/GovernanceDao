import { getSdk as defaultGqlSdk } from '#gql/default'
export { CredentialsInput, PageKeyInput, TileInput, AuthedQueryVariables, AuthedQuery, PlayerBaseLevelQueryVariables, PlayerBaseLevelQuery, BaseLevelCapacitiesQueryVariables, BaseLevelCapacitiesQuery, CorporationCapacityFragment, BurnedAvatarQueryVariables, BurnedAvatarQuery, GlobalWasteSystemOrderInfoQueryVariables, GlobalWasteSystemOrderInfoQuery, EternaLabsOrderInfoQueryVariables, EternaLabsOrderInfoQuery, NewLandsOrderInfoQueryVariables, NewLandsOrderInfoQuery, FacilityUpgradeOrderInfoQueryVariables, FacilityUpgradeOrderInfoQuery, FacilityUpgradeCooldownQueryVariables, FacilityUpgradeCooldownQuery, GlobalWasteSystemOrderCostsQueryVariables, GlobalWasteSystemOrderCostsQuery, EternaLabsOrderCostsQueryVariables, EternaLabsOrderCostsQuery, NewLandsOrderCostsQueryVariables, NewLandsOrderCostsQuery, FacilityUpgradeOrderCostsQueryVariables, FacilityUpgradeOrderCostsQuery, OrderFragment, OrderDataFragment, TokenFragment, TaxFragment, OrderCostFragment, ProbabilityWeightsFragment, CurrenciesQueryVariables, CurrenciesQuery, PayTokenFragment, GravityGradeNftBalanceQueryVariables, GravityGradeNftBalanceQuery, IsGgEligibleQueryVariables, IsGgEligibleQuery, GgSaleInfoQueryVariables, GgSaleInfoQuery, GravityGradeSaleInfoFragment, LandQueryVariables, LandQuery, LandTierCountFragment, LandmarksQueryVariables, LandmarksQuery, LuckyCatRaffleQueryVariables, LuckyCatRaffleQuery, LuckyCatRaffleFragment, RaffleInfoFragment, WinningsFragment, DailyTicketsFragment, PrizeFragment, PrizeItemFragment, UniqueLandWithInfoQueryVariables, UniqueLandWithInfoQuery, UniquePixWithInfoFromIdQueryVariables, UniquePixWithInfoFromIdQuery, PixResultsFragment, PageKeyFragment, PixInfoFragment, MintInfoFragment, RelayerFeeQueryVariables, RelayerFeeQuery, StakedOnTileQueryVariables, StakedOnTileQuery, OldStakedOnTileQueryVariables, OldStakedOnTileQuery, WasteNonceQueryVariables, WasteNonceQuery, OldWasteNonceQueryVariables, OldWasteNonceQuery, TileFragment, StakedNftFragment, StakedPixInfoFragment, StakedTopAssetInfoFragment, ResourceFragment, TokenInfoFragment, StakedMcnftQueryVariables, StakedMcnftQuery, StakedGenesisNftQueryVariables, StakedGenesisNftQuery, StakedGenesisNftEthQueryVariables, StakedGenesisNftEthQuery, StakedMcnftInfoFragment, TokensQueryVariables, TokensQuery, EthNfTsQueryVariables, EthNfTsQuery, RoversQueryVariables, RoversQuery, AvatarNftQueryVariables, AvatarNftQuery, TokenInfoQueryVariables, TokenInfoQuery, BadgeNftQueryVariables, BadgeNftQuery, NftFragment } from "#gql/default";
declare module '#gql' {
  type GqlClients = 'default'
  type GqlOps = 'Authed' | 'PlayerBaseLevel' | 'BaseLevelCapacities' | 'CorporationCapacity' | 'BurnedAvatar' | 'GlobalWasteSystemOrderInfo' | 'EternaLabsOrderInfo' | 'NewLandsOrderInfo' | 'FacilityUpgradeOrderInfo' | 'FacilityUpgradeCooldown' | 'GlobalWasteSystemOrderCosts' | 'EternaLabsOrderCosts' | 'NewLandsOrderCosts' | 'FacilityUpgradeOrderCosts' | 'Order' | 'OrderData' | 'Token' | 'Tax' | 'OrderCost' | 'ProbabilityWeights' | 'Currencies' | 'PayToken' | 'GravityGradeNFTBalance' | 'IsGGEligible' | 'GGSaleInfo' | 'GravityGradeSaleInfo' | 'Land' | 'LandTierCount' | 'Landmarks' | 'LuckyCatRaffle' | 'RaffleInfo' | 'Winnings' | 'DailyTickets' | 'Prize' | 'PrizeItem' | 'UniqueLandWithInfo' | 'UniquePixWithInfoFromId' | 'PageKeyInput' | 'PixResults' | 'PageKey' | 'PixInfo' | 'MintInfo' | 'RelayerFee' | 'StakedOnTile' | 'OldStakedOnTile' | 'WasteNonce' | 'OldWasteNonce' | 'Tile' | 'StakedNFT' | 'StakedPixInfo' | 'StakedTopAssetInfo' | 'Resource' | 'TokenInfo' | 'StakedMCNFT' | 'StakedGenesisNFT' | 'StakedGenesisNFTEth' | 'StakedMCNFTInfo' | 'Tokens' | 'EthNFTs' | 'Rovers' | 'AvatarNFT' | 'badgeNFT' | 'NFT'
  const GqClientOps = {"default":["Authed","PlayerBaseLevel","BaseLevelCapacities","CorporationCapacity","BurnedAvatar","GlobalWasteSystemOrderInfo","EternaLabsOrderInfo","NewLandsOrderInfo","FacilityUpgradeOrderInfo","FacilityUpgradeCooldown","GlobalWasteSystemOrderCosts","EternaLabsOrderCosts","NewLandsOrderCosts","FacilityUpgradeOrderCosts","Order","OrderData","Token","Tax","OrderCost","ProbabilityWeights","Currencies","PayToken","GravityGradeNFTBalance","IsGGEligible","GGSaleInfo","GravityGradeSaleInfo","Land","LandTierCount","Landmarks","LuckyCatRaffle","RaffleInfo","Winnings","DailyTickets","Prize","PrizeItem","UniqueLandWithInfo","UniquePixWithInfoFromId","PageKeyInput","PixResults","PageKey","PixInfo","MintInfo","RelayerFee","StakedOnTile","OldStakedOnTile","WasteNonce","OldWasteNonce","Tile","StakedNFT","StakedPixInfo","StakedTopAssetInfo","Resource","TokenInfo","StakedMCNFT","StakedGenesisNFT","StakedGenesisNFTEth","StakedMCNFTInfo","Tokens","EthNFTs","Rovers","AvatarNFT","badgeNFT","NFT"]}
  const GqlSdks = {
    default: defaultGqlSdk,
  }
  export const GqlAuthed: (...params: Parameters<GqlSdkFuncs['Authed']>) => ReturnType<GqlSdkFuncs['Authed']>
  export const GqlAvatarNFT: (...params: Parameters<GqlSdkFuncs['AvatarNFT']>) => ReturnType<GqlSdkFuncs['AvatarNFT']>
  export const GqlBaseLevelCapacities: (...params: Parameters<GqlSdkFuncs['BaseLevelCapacities']>) => ReturnType<GqlSdkFuncs['BaseLevelCapacities']>
  export const GqlBurnedAvatar: (...params: Parameters<GqlSdkFuncs['BurnedAvatar']>) => ReturnType<GqlSdkFuncs['BurnedAvatar']>
  export const GqlCurrencies: (...params: Parameters<GqlSdkFuncs['Currencies']>) => ReturnType<GqlSdkFuncs['Currencies']>
  export const GqlEternaLabsOrderCosts: (...params: Parameters<GqlSdkFuncs['EternaLabsOrderCosts']>) => ReturnType<GqlSdkFuncs['EternaLabsOrderCosts']>
  export const GqlEternaLabsOrderInfo: (...params: Parameters<GqlSdkFuncs['EternaLabsOrderInfo']>) => ReturnType<GqlSdkFuncs['EternaLabsOrderInfo']>
  export const GqlEthNFTs: (...params: Parameters<GqlSdkFuncs['EthNFTs']>) => ReturnType<GqlSdkFuncs['EthNFTs']>
  export const GqlFacilityUpgradeCooldown: (...params: Parameters<GqlSdkFuncs['FacilityUpgradeCooldown']>) => ReturnType<GqlSdkFuncs['FacilityUpgradeCooldown']>
  export const GqlFacilityUpgradeOrderCosts: (...params: Parameters<GqlSdkFuncs['FacilityUpgradeOrderCosts']>) => ReturnType<GqlSdkFuncs['FacilityUpgradeOrderCosts']>
  export const GqlFacilityUpgradeOrderInfo: (...params: Parameters<GqlSdkFuncs['FacilityUpgradeOrderInfo']>) => ReturnType<GqlSdkFuncs['FacilityUpgradeOrderInfo']>
  export const GqlGGSaleInfo: (...params: Parameters<GqlSdkFuncs['GGSaleInfo']>) => ReturnType<GqlSdkFuncs['GGSaleInfo']>
  export const GqlGlobalWasteSystemOrderCosts: (...params: Parameters<GqlSdkFuncs['GlobalWasteSystemOrderCosts']>) => ReturnType<GqlSdkFuncs['GlobalWasteSystemOrderCosts']>
  export const GqlGlobalWasteSystemOrderInfo: (...params: Parameters<GqlSdkFuncs['GlobalWasteSystemOrderInfo']>) => ReturnType<GqlSdkFuncs['GlobalWasteSystemOrderInfo']>
  export const GqlGravityGradeNFTBalance: (...params: Parameters<GqlSdkFuncs['GravityGradeNFTBalance']>) => ReturnType<GqlSdkFuncs['GravityGradeNFTBalance']>
  export const GqlIsGGEligible: (...params: Parameters<GqlSdkFuncs['IsGGEligible']>) => ReturnType<GqlSdkFuncs['IsGGEligible']>
  export const GqlLand: (...params: Parameters<GqlSdkFuncs['Land']>) => ReturnType<GqlSdkFuncs['Land']>
  export const GqlLandmarks: (...params: Parameters<GqlSdkFuncs['Landmarks']>) => ReturnType<GqlSdkFuncs['Landmarks']>
  export const GqlLuckyCatRaffle: (...params: Parameters<GqlSdkFuncs['LuckyCatRaffle']>) => ReturnType<GqlSdkFuncs['LuckyCatRaffle']>
  export const GqlNewLandsOrderCosts: (...params: Parameters<GqlSdkFuncs['NewLandsOrderCosts']>) => ReturnType<GqlSdkFuncs['NewLandsOrderCosts']>
  export const GqlNewLandsOrderInfo: (...params: Parameters<GqlSdkFuncs['NewLandsOrderInfo']>) => ReturnType<GqlSdkFuncs['NewLandsOrderInfo']>
  export const GqlOldStakedOnTile: (...params: Parameters<GqlSdkFuncs['OldStakedOnTile']>) => ReturnType<GqlSdkFuncs['OldStakedOnTile']>
  export const GqlOldWasteNonce: (...params: Parameters<GqlSdkFuncs['OldWasteNonce']>) => ReturnType<GqlSdkFuncs['OldWasteNonce']>
  export const GqlPlayerBaseLevel: (...params: Parameters<GqlSdkFuncs['PlayerBaseLevel']>) => ReturnType<GqlSdkFuncs['PlayerBaseLevel']>
  export const GqlRelayerFee: (...params: Parameters<GqlSdkFuncs['RelayerFee']>) => ReturnType<GqlSdkFuncs['RelayerFee']>
  export const GqlRovers: (...params: Parameters<GqlSdkFuncs['Rovers']>) => ReturnType<GqlSdkFuncs['Rovers']>
  export const GqlStakedGenesisNFT: (...params: Parameters<GqlSdkFuncs['StakedGenesisNFT']>) => ReturnType<GqlSdkFuncs['StakedGenesisNFT']>
  export const GqlStakedGenesisNFTEth: (...params: Parameters<GqlSdkFuncs['StakedGenesisNFTEth']>) => ReturnType<GqlSdkFuncs['StakedGenesisNFTEth']>
  export const GqlStakedMCNFT: (...params: Parameters<GqlSdkFuncs['StakedMCNFT']>) => ReturnType<GqlSdkFuncs['StakedMCNFT']>
  export const GqlStakedOnTile: (...params: Parameters<GqlSdkFuncs['StakedOnTile']>) => ReturnType<GqlSdkFuncs['StakedOnTile']>
  export const GqlTokenInfo: (...params: Parameters<GqlSdkFuncs['TokenInfo']>) => ReturnType<GqlSdkFuncs['TokenInfo']>
  export const GqlTokens: (...params: Parameters<GqlSdkFuncs['Tokens']>) => ReturnType<GqlSdkFuncs['Tokens']>
  export const GqlUniqueLandWithInfo: (...params: Parameters<GqlSdkFuncs['UniqueLandWithInfo']>) => ReturnType<GqlSdkFuncs['UniqueLandWithInfo']>
  export const GqlUniquePixWithInfoFromId: (...params: Parameters<GqlSdkFuncs['UniquePixWithInfoFromId']>) => ReturnType<GqlSdkFuncs['UniquePixWithInfoFromId']>
  export const GqlWasteNonce: (...params: Parameters<GqlSdkFuncs['WasteNonce']>) => ReturnType<GqlSdkFuncs['WasteNonce']>
  export const GqlBadgeNFT: (...params: Parameters<GqlSdkFuncs['badgeNFT']>) => ReturnType<GqlSdkFuncs['badgeNFT']>
  type GqlSdkFuncs = ReturnType<typeof defaultGqlSdk>
}