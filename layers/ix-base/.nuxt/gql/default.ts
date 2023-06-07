import type { GraphQLClient } from 'graphql-request';
import type * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type CredentialsInput = {
  playerId: Scalars['Int'];
  walletAddress: Scalars['String'];
};

export enum LandType {
  Area = 'area',
  Domain = 'domain',
  Pix = 'pix',
  Sector = 'sector',
  Zone = 'zone'
}

export type PageKeyInput = {
  chain?: InputMaybe<Scalars['String']>;
  elastic?: InputMaybe<Scalars['Int']>;
};

export enum PixTier {
  Common = 'common',
  Legendary = 'legendary',
  Outlier = 'outlier',
  Rare = 'rare',
  Uncommon = 'uncommon'
}

export type TileInput = {
  q?: InputMaybe<Scalars['Int']>;
  r?: InputMaybe<Scalars['Int']>;
  s?: InputMaybe<Scalars['Int']>;
};

export type AuthedQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthedQuery = { __typename: 'Query' };

export type PlayerBaseLevelQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type PlayerBaseLevelQuery = { playerBaseLevel?: number | null };

export type BaseLevelCapacitiesQueryVariables = Exact<{
  level: Scalars['Int'];
}>;


export type BaseLevelCapacitiesQuery = { baseLevelCapacities?: Array<{ name: string, capacity: number } | null> | null };

export type CorporationCapacityFragment = { name: string, capacity: number };

export type BurnedAvatarQueryVariables = Exact<{
  credentials: CredentialsInput;
  corporation: Scalars['String'];
}>;


export type BurnedAvatarQuery = { burnedAvatars?: boolean | null };

export type GlobalWasteSystemOrderInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type GlobalWasteSystemOrderInfoQuery = { globalWasteSystemOrderInfo?: Array<{ orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null } | null> | null };

export type EternaLabsOrderInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type EternaLabsOrderInfoQuery = { eternalLabsOrderInfo?: Array<{ orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null } | null> | null };

export type NewLandsOrderInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type NewLandsOrderInfoQuery = { newlandsOrderInfo?: Array<{ orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null } | null> | null };

export type FacilityUpgradeOrderInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type FacilityUpgradeOrderInfoQuery = { facilityUpgradeOrderInfo?: Array<{ orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null } | null> | null };

export type FacilityUpgradeCooldownQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type FacilityUpgradeCooldownQuery = { cooldownFacilityUpgrade?: number | null };

export type GlobalWasteSystemOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalWasteSystemOrderCostsQuery = { globalWasteSystemOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, fixedCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ type: string, tier?: string | null, value: number } | null> | null } | null };

export type EternaLabsOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type EternaLabsOrderCostsQuery = { eternalLabsOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, fixedCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ type: string, tier?: string | null, value: number } | null> | null } | null };

export type NewLandsOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type NewLandsOrderCostsQuery = { newlandsOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, fixedCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ type: string, tier?: string | null, value: number } | null> | null } | null };

export type FacilityUpgradeOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type FacilityUpgradeOrderCostsQuery = { facilityUpgradeOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, fixedCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ type: string, tier?: string | null, value: number } | null> | null } | null };

export type OrderFragment = { orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null };

export type OrderDataFragment = { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, fixedCosts?: Array<{ tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ type: string, tier?: string | null, value: number } | null> | null };

export type TokenFragment = { tokenId?: number | null, tier?: string | null, type?: string | null, balance?: number | null };

export type TaxFragment = { value?: number | null, basisPoints?: number | null };

export type OrderCostFragment = { tier?: string | null, type: string, min?: number | null, max?: number | null, multiplier?: number | null };

export type ProbabilityWeightsFragment = { type: string, tier?: string | null, value: number };

export type CurrenciesQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type CurrenciesQuery = { currencies?: Array<{ type?: string | null, balance?: number | null } | null> | null };

export type PayTokenFragment = { type?: string | null, balance?: number | null };

export type GravityGradeNftBalanceQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type GravityGradeNftBalanceQuery = { gravityGradeNFTBalance?: Array<{ tokenId?: number | null, tier?: string | null, type?: string | null, balance?: number | null } | null> | null };

export type IsGgEligibleQueryVariables = Exact<{
  credentials: CredentialsInput;
  packId: Scalars['Int'];
}>;


export type IsGgEligibleQuery = { isEligible?: boolean | null };

export type GgSaleInfoQueryVariables = Exact<{
  saleId?: InputMaybe<Scalars['Int']>;
}>;


export type GgSaleInfoQuery = { ggSaleInfo?: { saleId?: number | null, tokenId?: number | null, salePrice?: number | null, totalSupply?: number | null, userCap?: number | null, defaultCurrency?: string | null, profitState?: boolean | null } | null };

export type GravityGradeSaleInfoFragment = { saleId?: number | null, tokenId?: number | null, salePrice?: number | null, totalSupply?: number | null, userCap?: number | null, defaultCurrency?: string | null, profitState?: boolean | null };

export type LandQueryVariables = Exact<{
  credentials: CredentialsInput;
  chain?: InputMaybe<Scalars['String']>;
}>;


export type LandQuery = { landAmount?: { pix: { outlier: number, common: number, uncommon: number, rare: number, legendary: number }, area: { outlier: number, common: number, uncommon: number, rare: number, legendary: number }, zone: { outlier: number, common: number, uncommon: number, rare: number, legendary: number }, sector: { outlier: number, common: number, uncommon: number, rare: number, legendary: number }, domain: { outlier: number, common: number, uncommon: number, rare: number, legendary: number } } | null };

export type LandTierCountFragment = { outlier: number, common: number, uncommon: number, rare: number, legendary: number };

export type LandmarksQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type LandmarksQuery = { landmarks?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type LuckyCatRaffleQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type LuckyCatRaffleQuery = { luckyCatRaffleInfo?: { activeRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null>, pastRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null>, upcomingRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null>, myRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null> } | null };

export type LuckyCatRaffleFragment = { activeRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null>, pastRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null>, upcomingRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null>, myRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } } | null> };

export type RaffleInfoFragment = { id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, dailyTickets: { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> } };

export type WinningsFragment = { walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null>, hasClaimed: boolean };

export type DailyTicketsFragment = { ticketId: number, minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number };

export type PrizeFragment = { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ id: number, type: string, amount: number } | null> };

export type PrizeItemFragment = { id: number, type: string, amount: number };

export type UniqueLandWithInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
  tier: Scalars['String'];
  type: Scalars['String'];
  pageKey: PageKeyInput;
  chain?: InputMaybe<Scalars['String']>;
}>;


export type UniqueLandWithInfoQuery = { uniqueLand?: { items?: Array<{ title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null, pageKeys?: { elastic?: number | null, chain?: string | null } | null } | null };

export type UniquePixWithInfoFromIdQueryVariables = Exact<{
  credentials: CredentialsInput;
  pixId: Scalars['String'];
  chain?: InputMaybe<Scalars['String']>;
}>;


export type UniquePixWithInfoFromIdQuery = { searchPixId?: Array<{ title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type PixResultsFragment = { items?: Array<{ title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null, pageKeys?: { elastic?: number | null, chain?: string | null } | null };

export type PageKeyFragment = { elastic?: number | null, chain?: string | null };

export type PixInfoFragment = { title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null };

export type MintInfoFragment = { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null };

export type RelayerFeeQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type RelayerFeeQuery = { relayerFee?: string | null };

export type StakedOnTileQueryVariables = Exact<{
  credentials: CredentialsInput;
  tiles: Array<TileInput> | TileInput;
}>;


export type StakedOnTileQuery = { stakedOnTile?: Array<{ isRented: boolean, rentPrice?: string | null, rentalToken: string, tiles?: { q: number, r: number, s: number } | null, base?: { stakedAddress?: string | null, nonce?: number | null, land?: { title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null } | null, top?: Array<{ stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, token?: { title?: string | null, tokenId: string, tier: string, type: string, status?: string | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null } | null> | null } | null> | null };

export type OldStakedOnTileQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type OldStakedOnTileQuery = { oldStakedOnTile?: Array<{ isRented: boolean, rentPrice?: string | null, rentalToken: string, tiles?: { q: number, r: number, s: number } | null, base?: { stakedAddress?: string | null, nonce?: number | null, land?: { title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null } | null, top?: Array<{ stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, token?: { title?: string | null, tokenId: string, tier: string, type: string, status?: string | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null } | null> | null } | null> | null };

export type WasteNonceQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type WasteNonceQuery = { wasteNonce?: number | null };

export type OldWasteNonceQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type OldWasteNonceQuery = { oldWasteNonce?: number | null };

export type TileFragment = { q: number, r: number, s: number };

export type StakedNftFragment = { isRented: boolean, rentPrice?: string | null, rentalToken: string, tiles?: { q: number, r: number, s: number } | null, base?: { stakedAddress?: string | null, nonce?: number | null, land?: { title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null } | null, top?: Array<{ stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, token?: { title?: string | null, tokenId: string, tier: string, type: string, status?: string | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null } | null> | null };

export type StakedPixInfoFragment = { stakedAddress?: string | null, nonce?: number | null, land?: { title?: string | null, tokenId?: string | null, tier: PixTier, type: LandType, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null };

export type StakedTopAssetInfoFragment = { stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, token?: { title?: string | null, tokenId: string, tier: string, type: string, status?: string | null } | null, resource?: { tokenId?: number | null, balance?: number | null } | null };

export type ResourceFragment = { tokenId?: number | null, balance?: number | null };

export type TokenInfoFragment = { title?: string | null, tokenId: string, tier: string, type: string, status?: string | null };

export type StakedMcnftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type StakedMcnftQuery = { stakedMCNFTs?: Array<{ tokenId: number, amount: number, lockedAt: number } | null> | null };

export type StakedGenesisNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type StakedGenesisNftQuery = { stakedGenesisNFTs?: Array<{ tokenId: number, amount: number, lockedAt: number } | null> | null };

export type StakedGenesisNftEthQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type StakedGenesisNftEthQuery = { stakedGenesisNFTsEth?: Array<{ tokenId: number, amount: number, lockedAt: number } | null> | null };

export type StakedMcnftInfoFragment = { tokenId: number, amount: number, lockedAt: number };

export type TokensQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type TokensQuery = { missionControlTokens?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type EthNfTsQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type EthNfTsQuery = { ethNFTs?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type RoversQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type RoversQuery = { rover?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type AvatarNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type AvatarNftQuery = { avatarNFT?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type TokenInfoQueryVariables = Exact<{
  tokenIds: Array<Scalars['Int']> | Scalars['Int'];
  contractAddress: Scalars['String'];
}>;


export type TokenInfoQuery = { tokenInfo?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type BadgeNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type BadgeNftQuery = { badgeNFT?: Array<{ contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> } | null> | null };

export type NftFragment = { contract?: string | null, tokenType?: string | null, name: string, tokenId: string, description: string, external_url?: string | null, balance?: number | null, totalShares?: string | null, staked?: boolean | null, media: { animation_url?: string | null, image?: string | null }, mcMedia?: { icon?: string | null, image?: string | null, video?: string | null } | null, attributes: Array<{ value?: string | null, traitType?: string | null } | null> };

export const CorporationCapacityFragmentDoc = gql`
    fragment CorporationCapacity on CorporationCapacity {
  name
  capacity
}
    `;
export const OrderFragmentDoc = gql`
    fragment Order on Order {
  orderId
  orderAmount
  creationTime
  amountOfSpeedups
  defaultOrderTime
  speedUpTime
  totalOrderTime
  orderTokenId
  type
}
    `;
export const OrderCostFragmentDoc = gql`
    fragment OrderCost on OrderCost {
  tier
  type
  min
  max
  multiplier
}
    `;
export const TaxFragmentDoc = gql`
    fragment Tax on Tax {
  value
  basisPoints
}
    `;
export const ProbabilityWeightsFragmentDoc = gql`
    fragment ProbabilityWeights on ProbabilityWeights {
  type
  tier
  value
}
    `;
export const OrderDataFragmentDoc = gql`
    fragment OrderData on OrderData {
  defaultOrderTime
  variableCosts {
    ...OrderCost
  }
  fixedCosts {
    ...OrderCost
  }
  maxOrder
  ixtSpeedupCost
  astroSpeedupCost
  ixtCooldownSpeedupCost
  cooldownSpeedupTime
  tax {
    ...Tax
  }
  weight {
    ...ProbabilityWeights
  }
}
    `;
export const TokenFragmentDoc = gql`
    fragment Token on TokenWithBalance {
  tokenId
  tier
  type
  balance
}
    `;
export const PayTokenFragmentDoc = gql`
    fragment PayToken on PayType {
  type
  balance
}
    `;
export const GravityGradeSaleInfoFragmentDoc = gql`
    fragment GravityGradeSaleInfo on GravityGradeSaleInfo {
  saleId
  tokenId
  salePrice
  totalSupply
  userCap
  defaultCurrency
  profitState
}
    `;
export const LandTierCountFragmentDoc = gql`
    fragment LandTierCount on LandTierCount {
  outlier
  common
  uncommon
  rare
  legendary
}
    `;
export const DailyTicketsFragmentDoc = gql`
    fragment DailyTickets on DailyTickets {
  ticketId
  minEntriesPerWallet
  maxEntriesPerWallet
  maxTotalEntries
  startTime
  duration
}
    `;
export const WinningsFragmentDoc = gql`
    fragment Winnings on Winnings {
  walletAddress
  enteredWith
  amount
  prizeIds
  hasClaimed
}
    `;
export const PrizeItemFragmentDoc = gql`
    fragment PrizeItem on PrizeItem {
  id
  type
  amount
}
    `;
export const PrizeFragmentDoc = gql`
    fragment Prize on Prize {
  prizeAddress
  prizeType
  items {
    ...PrizeItem
  }
  totalPrizes
}
    `;
export const RaffleInfoFragmentDoc = gql`
    fragment RaffleInfo on RaffleInfo {
  id
  dailyTickets {
    ...DailyTickets
  }
  winnings {
    ...Winnings
  }
  prize {
    ...Prize
  }
  entriesByWallet
  totalEntries
  isDrawn
}
    `;
export const LuckyCatRaffleFragmentDoc = gql`
    fragment LuckyCatRaffle on LuckyCatRaffle {
  activeRaffles {
    ...RaffleInfo
  }
  pastRaffles {
    ...RaffleInfo
  }
  upcomingRaffles {
    ...RaffleInfo
  }
  myRaffles {
    ...RaffleInfo
  }
}
    `;
export const MintInfoFragmentDoc = gql`
    fragment MintInfo on MintInfo {
  pix_id
  category_id
  merkle_index
}
    `;
export const PixInfoFragmentDoc = gql`
    fragment PixInfo on PixInfo {
  title
  tokenId
  tier
  type
  staked
  minted
  mintInfo {
    ...MintInfo
  }
  inspectorLink
}
    `;
export const PageKeyFragmentDoc = gql`
    fragment PageKey on PageKey {
  elastic
  chain
}
    `;
export const PixResultsFragmentDoc = gql`
    fragment PixResults on PixResults {
  items {
    ...PixInfo
  }
  pageKeys {
    ...PageKey
  }
}
    `;
export const TileFragmentDoc = gql`
    fragment Tile on Tile {
  q
  r
  s
}
    `;
export const ResourceFragmentDoc = gql`
    fragment Resource on Resource {
  tokenId
  balance
}
    `;
export const StakedPixInfoFragmentDoc = gql`
    fragment StakedPixInfo on StakedPixInfo {
  stakedAddress
  nonce
  land {
    ...PixInfo
  }
  resource {
    ...Resource
  }
}
    `;
export const TokenInfoFragmentDoc = gql`
    fragment TokenInfo on TokenInfo {
  title
  tokenId
  tier
  type
  status
}
    `;
export const StakedTopAssetInfoFragmentDoc = gql`
    fragment StakedTopAssetInfo on StakedTopAssetInfo {
  stakedAddress
  token {
    ...TokenInfo
  }
  nonce
  timeLeft
  resource {
    ...Resource
  }
  index
}
    `;
export const StakedNftFragmentDoc = gql`
    fragment StakedNFT on StakedNFT {
  tiles {
    ...Tile
  }
  base {
    ...StakedPixInfo
  }
  top {
    ...StakedTopAssetInfo
  }
  isRented
  rentPrice
  rentalToken
}
    `;
export const StakedMcnftInfoFragmentDoc = gql`
    fragment StakedMCNFTInfo on StakedMCNFTInfo {
  tokenId
  amount
  lockedAt
}
    `;
export const NftFragmentDoc = gql`
    fragment NFT on Token {
  contract
  tokenType
  name
  tokenId
  description
  external_url
  media {
    animation_url
    image
  }
  mcMedia {
    icon
    image
    video
  }
  attributes {
    value
    traitType
  }
  balance
  totalShares
  staked
}
    `;
export const AuthedDocument = gql`
    query Authed {
  __typename
}
    `;
export const PlayerBaseLevelDocument = gql`
    query PlayerBaseLevel($credentials: CredentialsInput!) {
  playerBaseLevel(credentials: $credentials)
}
    `;
export const BaseLevelCapacitiesDocument = gql`
    query BaseLevelCapacities($level: Int!) {
  baseLevelCapacities(level: $level) {
    ...CorporationCapacity
  }
}
    ${CorporationCapacityFragmentDoc}`;
export const BurnedAvatarDocument = gql`
    query BurnedAvatar($credentials: CredentialsInput!, $corporation: String!) {
  burnedAvatars(credentials: $credentials, corporation: $corporation)
}
    `;
export const GlobalWasteSystemOrderInfoDocument = gql`
    query GlobalWasteSystemOrderInfo($credentials: CredentialsInput!) {
  globalWasteSystemOrderInfo(credentials: $credentials) {
    ...Order
  }
}
    ${OrderFragmentDoc}`;
export const EternaLabsOrderInfoDocument = gql`
    query EternaLabsOrderInfo($credentials: CredentialsInput!) {
  eternalLabsOrderInfo(credentials: $credentials) {
    ...Order
  }
}
    ${OrderFragmentDoc}`;
export const NewLandsOrderInfoDocument = gql`
    query NewLandsOrderInfo($credentials: CredentialsInput!) {
  newlandsOrderInfo(credentials: $credentials) {
    ...Order
  }
}
    ${OrderFragmentDoc}`;
export const FacilityUpgradeOrderInfoDocument = gql`
    query FacilityUpgradeOrderInfo($credentials: CredentialsInput!) {
  facilityUpgradeOrderInfo(credentials: $credentials) {
    ...Order
  }
}
    ${OrderFragmentDoc}`;
export const FacilityUpgradeCooldownDocument = gql`
    query FacilityUpgradeCooldown($credentials: CredentialsInput!) {
  cooldownFacilityUpgrade(credentials: $credentials)
}
    `;
export const GlobalWasteSystemOrderCostsDocument = gql`
    query GlobalWasteSystemOrderCosts {
  globalWasteSystemOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightsFragmentDoc}`;
export const EternaLabsOrderCostsDocument = gql`
    query EternaLabsOrderCosts {
  eternalLabsOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightsFragmentDoc}`;
export const NewLandsOrderCostsDocument = gql`
    query NewLandsOrderCosts {
  newlandsOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightsFragmentDoc}`;
export const FacilityUpgradeOrderCostsDocument = gql`
    query FacilityUpgradeOrderCosts {
  facilityUpgradeOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightsFragmentDoc}`;
export const CurrenciesDocument = gql`
    query Currencies($credentials: CredentialsInput!) {
  currencies(credentials: $credentials) {
    ...PayToken
  }
}
    ${PayTokenFragmentDoc}`;
export const GravityGradeNftBalanceDocument = gql`
    query GravityGradeNFTBalance($credentials: CredentialsInput!) {
  gravityGradeNFTBalance(credentials: $credentials) {
    ...Token
  }
}
    ${TokenFragmentDoc}`;
export const IsGgEligibleDocument = gql`
    query IsGGEligible($credentials: CredentialsInput!, $packId: Int!) {
  isEligible(credentials: $credentials, packId: $packId)
}
    `;
export const GgSaleInfoDocument = gql`
    query GGSaleInfo($saleId: Int) {
  ggSaleInfo(saleId: $saleId) {
    ...GravityGradeSaleInfo
  }
}
    ${GravityGradeSaleInfoFragmentDoc}`;
export const LandDocument = gql`
    query Land($credentials: CredentialsInput!, $chain: String) {
  landAmount(credentials: $credentials, chain: $chain) {
    pix {
      ...LandTierCount
    }
    area {
      ...LandTierCount
    }
    zone {
      ...LandTierCount
    }
    sector {
      ...LandTierCount
    }
    domain {
      ...LandTierCount
    }
  }
}
    ${LandTierCountFragmentDoc}`;
export const LandmarksDocument = gql`
    query Landmarks($credentials: CredentialsInput!) {
  landmarks(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;
export const LuckyCatRaffleDocument = gql`
    query LuckyCatRaffle($credentials: CredentialsInput!) {
  luckyCatRaffleInfo(credentials: $credentials) {
    ...LuckyCatRaffle
  }
}
    ${LuckyCatRaffleFragmentDoc}
${RaffleInfoFragmentDoc}
${DailyTicketsFragmentDoc}
${WinningsFragmentDoc}
${PrizeFragmentDoc}
${PrizeItemFragmentDoc}`;
export const UniqueLandWithInfoDocument = gql`
    query UniqueLandWithInfo($credentials: CredentialsInput!, $tier: String!, $type: String!, $pageKey: PageKeyInput!, $chain: String) {
  uniqueLand(
    credentials: $credentials
    tier: $tier
    type: $type
    pageKeys: $pageKey
    chain: $chain
  ) {
    ...PixResults
  }
}
    ${PixResultsFragmentDoc}
${PixInfoFragmentDoc}
${MintInfoFragmentDoc}
${PageKeyFragmentDoc}`;
export const UniquePixWithInfoFromIdDocument = gql`
    query UniquePixWithInfoFromId($credentials: CredentialsInput!, $pixId: String!, $chain: String) {
  searchPixId(credentials: $credentials, pixId: $pixId, chain: $chain) {
    ...PixInfo
  }
}
    ${PixInfoFragmentDoc}
${MintInfoFragmentDoc}`;
export const RelayerFeeDocument = gql`
    query RelayerFee($credentials: CredentialsInput!) {
  relayerFee(credentials: $credentials)
}
    `;
export const StakedOnTileDocument = gql`
    query StakedOnTile($credentials: CredentialsInput!, $tiles: [TileInput!]!) {
  stakedOnTile(credentials: $credentials, tiles: $tiles) {
    ...StakedNFT
  }
}
    ${StakedNftFragmentDoc}
${TileFragmentDoc}
${StakedPixInfoFragmentDoc}
${PixInfoFragmentDoc}
${MintInfoFragmentDoc}
${ResourceFragmentDoc}
${StakedTopAssetInfoFragmentDoc}
${TokenInfoFragmentDoc}`;
export const OldStakedOnTileDocument = gql`
    query OldStakedOnTile($credentials: CredentialsInput!) {
  oldStakedOnTile(credentials: $credentials) {
    ...StakedNFT
  }
}
    ${StakedNftFragmentDoc}
${TileFragmentDoc}
${StakedPixInfoFragmentDoc}
${PixInfoFragmentDoc}
${MintInfoFragmentDoc}
${ResourceFragmentDoc}
${StakedTopAssetInfoFragmentDoc}
${TokenInfoFragmentDoc}`;
export const WasteNonceDocument = gql`
    query WasteNonce($credentials: CredentialsInput!) {
  wasteNonce(credentials: $credentials)
}
    `;
export const OldWasteNonceDocument = gql`
    query OldWasteNonce($credentials: CredentialsInput!) {
  oldWasteNonce(credentials: $credentials)
}
    `;
export const StakedMcnftDocument = gql`
    query StakedMCNFT($credentials: CredentialsInput!) {
  stakedMCNFTs(credentials: $credentials) {
    ...StakedMCNFTInfo
  }
}
    ${StakedMcnftInfoFragmentDoc}`;
export const StakedGenesisNftDocument = gql`
    query StakedGenesisNFT($credentials: CredentialsInput!) {
  stakedGenesisNFTs(credentials: $credentials) {
    ...StakedMCNFTInfo
  }
}
    ${StakedMcnftInfoFragmentDoc}`;
export const StakedGenesisNftEthDocument = gql`
    query StakedGenesisNFTEth($credentials: CredentialsInput!) {
  stakedGenesisNFTsEth(credentials: $credentials) {
    ...StakedMCNFTInfo
  }
}
    ${StakedMcnftInfoFragmentDoc}`;
export const TokensDocument = gql`
    query Tokens($credentials: CredentialsInput!) {
  missionControlTokens(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;
export const EthNfTsDocument = gql`
    query EthNFTs($credentials: CredentialsInput!) {
  ethNFTs(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;
export const RoversDocument = gql`
    query Rovers($credentials: CredentialsInput!) {
  rover(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;
export const AvatarNftDocument = gql`
    query AvatarNFT($credentials: CredentialsInput!) {
  avatarNFT(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;
export const TokenInfoDocument = gql`
    query TokenInfo($tokenIds: [Int!]!, $contractAddress: String!) {
  tokenInfo(tokenIds: $tokenIds, contractAddress: $contractAddress) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;
export const BadgeNftDocument = gql`
    query badgeNFT($credentials: CredentialsInput!) {
  badgeNFT(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Authed(variables?: AuthedQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthedQuery>(AuthedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Authed', 'query');
    },
    PlayerBaseLevel(variables: PlayerBaseLevelQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<PlayerBaseLevelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayerBaseLevelQuery>(PlayerBaseLevelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PlayerBaseLevel', 'query');
    },
    BaseLevelCapacities(variables: BaseLevelCapacitiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BaseLevelCapacitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BaseLevelCapacitiesQuery>(BaseLevelCapacitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BaseLevelCapacities', 'query');
    },
    BurnedAvatar(variables: BurnedAvatarQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BurnedAvatarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BurnedAvatarQuery>(BurnedAvatarDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BurnedAvatar', 'query');
    },
    GlobalWasteSystemOrderInfo(variables: GlobalWasteSystemOrderInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GlobalWasteSystemOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GlobalWasteSystemOrderInfoQuery>(GlobalWasteSystemOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GlobalWasteSystemOrderInfo', 'query');
    },
    EternaLabsOrderInfo(variables: EternaLabsOrderInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EternaLabsOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EternaLabsOrderInfoQuery>(EternaLabsOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EternaLabsOrderInfo', 'query');
    },
    NewLandsOrderInfo(variables: NewLandsOrderInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NewLandsOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewLandsOrderInfoQuery>(NewLandsOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NewLandsOrderInfo', 'query');
    },
    FacilityUpgradeOrderInfo(variables: FacilityUpgradeOrderInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FacilityUpgradeOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FacilityUpgradeOrderInfoQuery>(FacilityUpgradeOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FacilityUpgradeOrderInfo', 'query');
    },
    FacilityUpgradeCooldown(variables: FacilityUpgradeCooldownQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FacilityUpgradeCooldownQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FacilityUpgradeCooldownQuery>(FacilityUpgradeCooldownDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FacilityUpgradeCooldown', 'query');
    },
    GlobalWasteSystemOrderCosts(variables?: GlobalWasteSystemOrderCostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GlobalWasteSystemOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GlobalWasteSystemOrderCostsQuery>(GlobalWasteSystemOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GlobalWasteSystemOrderCosts', 'query');
    },
    EternaLabsOrderCosts(variables?: EternaLabsOrderCostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EternaLabsOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EternaLabsOrderCostsQuery>(EternaLabsOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EternaLabsOrderCosts', 'query');
    },
    NewLandsOrderCosts(variables?: NewLandsOrderCostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NewLandsOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewLandsOrderCostsQuery>(NewLandsOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NewLandsOrderCosts', 'query');
    },
    FacilityUpgradeOrderCosts(variables?: FacilityUpgradeOrderCostsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FacilityUpgradeOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FacilityUpgradeOrderCostsQuery>(FacilityUpgradeOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FacilityUpgradeOrderCosts', 'query');
    },
    Currencies(variables: CurrenciesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrenciesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrenciesQuery>(CurrenciesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Currencies', 'query');
    },
    GravityGradeNFTBalance(variables: GravityGradeNftBalanceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GravityGradeNftBalanceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GravityGradeNftBalanceQuery>(GravityGradeNftBalanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GravityGradeNFTBalance', 'query');
    },
    IsGGEligible(variables: IsGgEligibleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<IsGgEligibleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsGgEligibleQuery>(IsGgEligibleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'IsGGEligible', 'query');
    },
    GGSaleInfo(variables?: GgSaleInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GgSaleInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GgSaleInfoQuery>(GgSaleInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GGSaleInfo', 'query');
    },
    Land(variables: LandQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LandQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LandQuery>(LandDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Land', 'query');
    },
    Landmarks(variables: LandmarksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LandmarksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LandmarksQuery>(LandmarksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Landmarks', 'query');
    },
    LuckyCatRaffle(variables: LuckyCatRaffleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LuckyCatRaffleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LuckyCatRaffleQuery>(LuckyCatRaffleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LuckyCatRaffle', 'query');
    },
    UniqueLandWithInfo(variables: UniqueLandWithInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UniqueLandWithInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UniqueLandWithInfoQuery>(UniqueLandWithInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UniqueLandWithInfo', 'query');
    },
    UniquePixWithInfoFromId(variables: UniquePixWithInfoFromIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UniquePixWithInfoFromIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UniquePixWithInfoFromIdQuery>(UniquePixWithInfoFromIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UniquePixWithInfoFromId', 'query');
    },
    RelayerFee(variables: RelayerFeeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RelayerFeeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RelayerFeeQuery>(RelayerFeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RelayerFee', 'query');
    },
    StakedOnTile(variables: StakedOnTileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StakedOnTileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedOnTileQuery>(StakedOnTileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedOnTile', 'query');
    },
    OldStakedOnTile(variables: OldStakedOnTileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OldStakedOnTileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OldStakedOnTileQuery>(OldStakedOnTileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OldStakedOnTile', 'query');
    },
    WasteNonce(variables: WasteNonceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<WasteNonceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WasteNonceQuery>(WasteNonceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'WasteNonce', 'query');
    },
    OldWasteNonce(variables: OldWasteNonceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OldWasteNonceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OldWasteNonceQuery>(OldWasteNonceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OldWasteNonce', 'query');
    },
    StakedMCNFT(variables: StakedMcnftQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StakedMcnftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedMcnftQuery>(StakedMcnftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedMCNFT', 'query');
    },
    StakedGenesisNFT(variables: StakedGenesisNftQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StakedGenesisNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedGenesisNftQuery>(StakedGenesisNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedGenesisNFT', 'query');
    },
    StakedGenesisNFTEth(variables: StakedGenesisNftEthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StakedGenesisNftEthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedGenesisNftEthQuery>(StakedGenesisNftEthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedGenesisNFTEth', 'query');
    },
    Tokens(variables: TokensQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokensQuery>(TokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Tokens', 'query');
    },
    EthNFTs(variables: EthNfTsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EthNfTsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EthNfTsQuery>(EthNfTsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EthNFTs', 'query');
    },
    Rovers(variables: RoversQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RoversQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RoversQuery>(RoversDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Rovers', 'query');
    },
    AvatarNFT(variables: AvatarNftQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AvatarNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AvatarNftQuery>(AvatarNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AvatarNFT', 'query');
    },
    TokenInfo(variables: TokenInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenInfoQuery>(TokenInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenInfo', 'query');
    },
    badgeNFT(variables: BadgeNftQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BadgeNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BadgeNftQuery>(BadgeNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'badgeNFT', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;