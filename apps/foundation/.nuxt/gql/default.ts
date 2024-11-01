import type { GraphQLClient } from 'graphql-request';
import type { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum CacheControlScope {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC'
}

export type CredentialsInput = {
  playerId?: InputMaybe<Scalars['Int']['input']>;
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum LandType {
  Area = 'area',
  Domain = 'domain',
  Pix = 'pix',
  Sector = 'sector',
  Zone = 'zone'
}

export enum LandmarkSort {
  EarningHighToLow = 'earningHighToLow',
  EarningLowToHigh = 'earningLowToHigh',
  OwnersHighToLow = 'ownersHighToLow',
  OwnersLowToHigh = 'ownersLowToHigh',
  SharesHighToLow = 'sharesHighToLow',
  SharesLowToHigh = 'sharesLowToHigh',
  StarsHighToLow = 'starsHighToLow',
  StarsLowToHigh = 'starsLowToHigh'
}

export enum LandmarkTier {
  All = 'all',
  Common = 'common',
  Legendary = 'legendary',
  Outlier = 'outlier',
  Rare = 'rare',
  Uncommon = 'uncommon'
}

export type PageKeyInput = {
  chain?: InputMaybe<Scalars['String']['input']>;
  elastic?: InputMaybe<Scalars['Int']['input']>;
};

export enum PixTier {
  Common = 'common',
  Legendary = 'legendary',
  Outlier = 'outlier',
  Rare = 'rare',
  Uncommon = 'uncommon'
}

export enum StakingId {
  CatRaff = 'catRaff',
  Energy = 'energy',
  EnergyAmelia = 'energyAmelia',
  IxtOneMonth = 'ixtOneMonth',
  IxtSixMonths = 'ixtSixMonths',
  IxtThreeMonths = 'ixtThreeMonths',
  IxtTwelveMonths = 'ixtTwelveMonths',
  Landmark = 'landmark',
  LpMATIC = 'lpMATIC',
  LpUSDT = 'lpUSDT',
  Metashare = 'metashare',
  Territories = 'territories',
  TerritoriesUser = 'territoriesUser'
}

export type StakingTypes = {
  type?: InputMaybe<PixTier>;
};

export type TileInput = {
  q?: InputMaybe<Scalars['Int']['input']>;
  r?: InputMaybe<Scalars['Int']['input']>;
  s?: InputMaybe<Scalars['Int']['input']>;
};

export type TokenInput = {
  tier?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type AuthedQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthedQuery = { __typename: 'Query' };

export type LandQueryVariables = Exact<{
  credentials: CredentialsInput;
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type LandQuery = { landAmount?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type LandmarksQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type LandmarksQuery = { landmarks?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type AllLandmarksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  searchWord?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<LandmarkTier>;
  order?: InputMaybe<LandmarkSort>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AllLandmarksQuery = { allLandmarks?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type UniqueLandWithInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
  tier: Scalars['String']['input'];
  type: Scalars['String']['input'];
  pageKey: PageKeyInput;
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type UniqueLandWithInfoQuery = { uniqueLand?: { items?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null, pageKeys?: { elastic?: number | null, chain?: string | null } | null } | null };

export type UniquePixWithInfoFromIdQueryVariables = Exact<{
  credentials: CredentialsInput;
  pixId: Scalars['String']['input'];
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type UniquePixWithInfoFromIdQuery = { searchPixId?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type PixResultsFragment = { items?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null, pageKeys?: { elastic?: number | null, chain?: string | null } | null };

export type PageKeyFragment = { elastic?: number | null, chain?: string | null };

export type CurrenciesQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type CurrenciesQuery = { currencies?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type StakingDataQueryVariables = Exact<{
  credentials?: InputMaybe<CredentialsInput>;
  id: StakingId;
}>;


export type StakingDataQuery = { stakingData?: { epochEndtime?: number | null, currentEpochPool?: number | null, nextEpochPool?: number | null, totalStakedAmount?: number | null, lockPeriod?: number | null, prizeAmount?: number | null, userSpecificStakingData?: { totalUserReward?: number | null, totalUserRewardPerDay?: number | null, totalUserRewardPerThirtyDays?: number | null, currentWeekTickets?: { week?: number | null, amount?: number | null } | null, pastWeekTickets?: Array<{ week?: number | null, amount?: number | null } | null> | null } | null, stakingItems: Array<{ rewardPerDay?: number | null, rewardPerThirtyDays?: number | null, rewardRate?: number | null, totalStaked?: number | null, odds?: number | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null }, userStakingData?: { amountStaked?: number | null, totalReward?: number | null, userRewardPerDay?: number | null, userRewardPerThirtyDays?: number | null, balanceOfToken?: number | null, stakedAt?: number | null, energyStakedAt?: Array<{ amount?: number | null, timestamp?: number | null } | null> | null } | null } | null> } | null };

export type CatRaffAccountsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CatRaffAccountsQuery = { catRaffAccounts?: Array<{ address?: string | null, week?: number | null, totalTickets?: number | null, winAmount?: number | null, userEnteredTicket?: number | null } | null> | null };

export type CatRaffPastPrizesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CatRaffPastPrizesQuery = { catRaffPastPrizes?: Array<{ address?: string | null, week?: number | null, totalTickets?: number | null, winAmount?: number | null, userEnteredTicket?: number | null } | null> | null };

export type CatRaffWeeklyQueryVariables = Exact<{
  credentials?: InputMaybe<CredentialsInput>;
}>;


export type CatRaffWeeklyQuery = { catRaffWeekly?: Array<{ address?: string | null, week?: number | null, totalTickets?: number | null, winAmount?: number | null, userEnteredTicket?: number | null } | null> | null };

export type TotalFacilitiesMintedQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalFacilitiesMintedQuery = { totalFacilitiesMinted?: number | null };

export type CatRaffTicketInfoFragment = { address?: string | null, week?: number | null, totalTickets?: number | null, winAmount?: number | null, userEnteredTicket?: number | null };

export type StakingDataFragment = { epochEndtime?: number | null, currentEpochPool?: number | null, nextEpochPool?: number | null, totalStakedAmount?: number | null, lockPeriod?: number | null, prizeAmount?: number | null, userSpecificStakingData?: { totalUserReward?: number | null, totalUserRewardPerDay?: number | null, totalUserRewardPerThirtyDays?: number | null, currentWeekTickets?: { week?: number | null, amount?: number | null } | null, pastWeekTickets?: Array<{ week?: number | null, amount?: number | null } | null> | null } | null, stakingItems: Array<{ rewardPerDay?: number | null, rewardPerThirtyDays?: number | null, rewardRate?: number | null, totalStaked?: number | null, odds?: number | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null }, userStakingData?: { amountStaked?: number | null, totalReward?: number | null, userRewardPerDay?: number | null, userRewardPerThirtyDays?: number | null, balanceOfToken?: number | null, stakedAt?: number | null, energyStakedAt?: Array<{ amount?: number | null, timestamp?: number | null } | null> | null } | null } | null> };

export type WeeklyTicketDataFragment = { week?: number | null, amount?: number | null };

export type UserSpecificStakingDataFragment = { totalUserReward?: number | null, totalUserRewardPerDay?: number | null, totalUserRewardPerThirtyDays?: number | null, currentWeekTickets?: { week?: number | null, amount?: number | null } | null, pastWeekTickets?: Array<{ week?: number | null, amount?: number | null } | null> | null };

export type TokenSpecificUserStakingDataFragment = { amountStaked?: number | null, totalReward?: number | null, userRewardPerDay?: number | null, userRewardPerThirtyDays?: number | null, balanceOfToken?: number | null, stakedAt?: number | null, energyStakedAt?: Array<{ amount?: number | null, timestamp?: number | null } | null> | null };

export type StakingItemFragment = { rewardPerDay?: number | null, rewardPerThirtyDays?: number | null, rewardRate?: number | null, totalStaked?: number | null, odds?: number | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null }, userStakingData?: { amountStaked?: number | null, totalReward?: number | null, userRewardPerDay?: number | null, userRewardPerThirtyDays?: number | null, balanceOfToken?: number | null, stakedAt?: number | null, energyStakedAt?: Array<{ amount?: number | null, timestamp?: number | null } | null> | null } | null };

export type EnergyStakedAtFragment = { amount?: number | null, timestamp?: number | null };

export type TokensQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type TokensQuery = { missionControlTokens?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type EthNfTsQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type EthNfTsQuery = { ethNFTs?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type RoversQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type RoversQuery = { rover?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type AvatarNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type AvatarNftQuery = { avatarNFT?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type GeoLotteryNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type GeoLotteryNftQuery = { geoLotteryNFT?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type TokenInfoQueryVariables = Exact<{
  tokenIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
}>;


export type TokenInfoQuery = { tokenInfo?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type TokenInfoTypeTierQueryVariables = Exact<{
  tokens: Array<TokenInput> | TokenInput;
  contractAddress: Scalars['String']['input'];
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type TokenInfoTypeTierQuery = { tokenInfoTypeTier?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type BadgeNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type BadgeNftQuery = { badgeNFT?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type AllUserTerritoriesQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type AllUserTerritoriesQuery = { allUserTerritories?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type NftFragment = { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null };

export type TokenInfoFragment = { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, dailyYield?: number | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null };

export type AttributeFragment = { value?: string | null, traitType?: string | null };

export type MediaFragment = { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null };

export type MintInfoFragment = { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null };

export type CatRaffTransactionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CatRaffTransactionsQuery = { catRaffTransactions?: Array<{ blockNumber?: string | null, timeStamp?: string | null, hash?: string | null, nonce?: string | null, blockHash?: string | null, from?: string | null, contractAddress?: string | null, to?: string | null, value?: string | null, tokenName?: string | null, tokenSymbol?: string | null, tokenDecimal?: string | null, transactionIndex?: string | null, gas?: string | null, gasPrice?: string | null, gasUsed?: string | null, cumulativeGasUsed?: string | null, input?: string | null, confirmations?: string | null } | null> | null };

export type UserIxtTransactionsQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type UserIxtTransactionsQuery = { userIxtTransactions?: Array<{ blockNumber?: string | null, timeStamp?: string | null, hash?: string | null, nonce?: string | null, blockHash?: string | null, from?: string | null, contractAddress?: string | null, to?: string | null, value?: string | null, tokenName?: string | null, tokenSymbol?: string | null, tokenDecimal?: string | null, transactionIndex?: string | null, gas?: string | null, gasPrice?: string | null, gasUsed?: string | null, cumulativeGasUsed?: string | null, input?: string | null, confirmations?: string | null } | null> | null };

export type PolygonScanTransactionsFragment = { blockNumber?: string | null, timeStamp?: string | null, hash?: string | null, nonce?: string | null, blockHash?: string | null, from?: string | null, contractAddress?: string | null, to?: string | null, value?: string | null, tokenName?: string | null, tokenSymbol?: string | null, tokenDecimal?: string | null, transactionIndex?: string | null, gas?: string | null, gasPrice?: string | null, gasUsed?: string | null, cumulativeGasUsed?: string | null, input?: string | null, confirmations?: string | null };

export const AttributeFragmentDoc = gql`
    fragment Attribute on Attribute {
  value
  traitType
}
    `;
export const TokenInfoFragmentDoc = gql`
    fragment TokenInfo on TokenInfo {
  title
  tier
  type
  status
  description
  attributes {
    ...Attribute
  }
  staked
  minted
  inspectorLink
  level
  openable
  dailyYield
}
    `;
export const MediaFragmentDoc = gql`
    fragment Media on Media {
  animation_url
  image
  mcIcon
  mcImage
  mcVideo
  alchemyThumbnail
  alchemy
}
    `;
export const MintInfoFragmentDoc = gql`
    fragment MintInfo on MintInfo {
  pix_id
  category_id
  merkle_index
}
    `;
export const NftFragmentDoc = gql`
    fragment NFT on Token {
  contract
  tokenType
  external_url
  tokenId
  balance
  tokenInfo {
    ...TokenInfo
  }
  media {
    ...Media
  }
  network
  mintInfo {
    ...MintInfo
  }
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
    ...NFT
  }
  pageKeys {
    ...PageKey
  }
}
    `;
export const CatRaffTicketInfoFragmentDoc = gql`
    fragment CatRaffTicketInfo on CatRaffTicketInfo {
  address
  week
  totalTickets
  winAmount
  userEnteredTicket
}
    `;
export const WeeklyTicketDataFragmentDoc = gql`
    fragment WeeklyTicketData on WeeklyTicketData {
  week
  amount
}
    `;
export const UserSpecificStakingDataFragmentDoc = gql`
    fragment UserSpecificStakingData on UserSpecificStakingData {
  totalUserReward
  totalUserRewardPerDay
  totalUserRewardPerThirtyDays
  currentWeekTickets {
    ...WeeklyTicketData
  }
  pastWeekTickets {
    ...WeeklyTicketData
  }
}
    `;
export const EnergyStakedAtFragmentDoc = gql`
    fragment EnergyStakedAt on EnergyStakedAt {
  amount
  timestamp
}
    `;
export const TokenSpecificUserStakingDataFragmentDoc = gql`
    fragment TokenSpecificUserStakingData on TokenSpecificUserStakingData {
  amountStaked
  totalReward
  userRewardPerDay
  userRewardPerThirtyDays
  balanceOfToken
  stakedAt
  energyStakedAt {
    ...EnergyStakedAt
  }
}
    `;
export const StakingItemFragmentDoc = gql`
    fragment StakingItem on StakingItem {
  token {
    ...NFT
  }
  rewardPerDay
  rewardPerThirtyDays
  rewardRate
  totalStaked
  userStakingData {
    ...TokenSpecificUserStakingData
  }
  odds
}
    `;
export const StakingDataFragmentDoc = gql`
    fragment StakingData on StakingData {
  epochEndtime
  currentEpochPool
  nextEpochPool
  totalStakedAmount
  lockPeriod
  userSpecificStakingData {
    ...UserSpecificStakingData
  }
  prizeAmount
  stakingItems {
    ...StakingItem
  }
}
    `;
export const PolygonScanTransactionsFragmentDoc = gql`
    fragment PolygonScanTransactions on PolygonScanTransactions {
  blockNumber
  timeStamp
  hash
  nonce
  blockHash
  from
  contractAddress
  to
  value
  tokenName
  tokenSymbol
  tokenDecimal
  transactionIndex
  gas
  gasPrice
  gasUsed
  cumulativeGasUsed
  input
  confirmations
}
    `;
export const AuthedDocument = gql`
    query Authed {
  __typename
}
    `;
export const LandDocument = gql`
    query Land($credentials: CredentialsInput!, $chain: String) {
  landAmount(credentials: $credentials, chain: $chain) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const LandmarksDocument = gql`
    query Landmarks($credentials: CredentialsInput!) {
  landmarks(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const AllLandmarksDocument = gql`
    query AllLandmarks($page: Int, $searchWord: String, $filter: LandmarkTier, $order: LandmarkSort, $take: Int) {
  allLandmarks(
    page: $page
    searchWord: $searchWord
    filter: $filter
    order: $order
    take: $take
  ) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
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
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${PageKeyFragmentDoc}`;
export const UniquePixWithInfoFromIdDocument = gql`
    query UniquePixWithInfoFromId($credentials: CredentialsInput!, $pixId: String!, $chain: String) {
  searchPixId(credentials: $credentials, pixId: $pixId, chain: $chain) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const CurrenciesDocument = gql`
    query Currencies($credentials: CredentialsInput!) {
  currencies(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const StakingDataDocument = gql`
    query StakingData($credentials: CredentialsInput, $id: StakingId!) {
  stakingData(credentials: $credentials, id: $id) {
    ...StakingData
  }
}
    ${StakingDataFragmentDoc}
${UserSpecificStakingDataFragmentDoc}
${WeeklyTicketDataFragmentDoc}
${StakingItemFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${TokenSpecificUserStakingDataFragmentDoc}
${EnergyStakedAtFragmentDoc}`;
export const CatRaffAccountsDocument = gql`
    query CatRaffAccounts($skip: Int) {
  catRaffAccounts(skip: $skip) {
    ...CatRaffTicketInfo
  }
}
    ${CatRaffTicketInfoFragmentDoc}`;
export const CatRaffPastPrizesDocument = gql`
    query CatRaffPastPrizes($skip: Int) {
  catRaffPastPrizes(skip: $skip) {
    ...CatRaffTicketInfo
  }
}
    ${CatRaffTicketInfoFragmentDoc}`;
export const CatRaffWeeklyDocument = gql`
    query CatRaffWeekly($credentials: CredentialsInput) {
  catRaffWeekly(credentials: $credentials) {
    ...CatRaffTicketInfo
  }
}
    ${CatRaffTicketInfoFragmentDoc}`;
export const TotalFacilitiesMintedDocument = gql`
    query TotalFacilitiesMinted {
  totalFacilitiesMinted
}
    `;
export const TokensDocument = gql`
    query Tokens($credentials: CredentialsInput!) {
  missionControlTokens(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const EthNfTsDocument = gql`
    query EthNFTs($credentials: CredentialsInput!) {
  ethNFTs(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const RoversDocument = gql`
    query Rovers($credentials: CredentialsInput!) {
  rover(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const AvatarNftDocument = gql`
    query AvatarNFT($credentials: CredentialsInput!) {
  avatarNFT(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const GeoLotteryNftDocument = gql`
    query GeoLotteryNFT($credentials: CredentialsInput!) {
  geoLotteryNFT(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const TokenInfoDocument = gql`
    query TokenInfo($tokenIds: [Int!]!, $contractAddress: String!) {
  tokenInfo(tokenIds: $tokenIds, contractAddress: $contractAddress) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const TokenInfoTypeTierDocument = gql`
    query TokenInfoTypeTier($tokens: [TokenInput!]!, $contractAddress: String!, $chain: String) {
  tokenInfoTypeTier(
    tokens: $tokens
    contractAddress: $contractAddress
    chain: $chain
  ) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const BadgeNftDocument = gql`
    query badgeNFT($credentials: CredentialsInput!) {
  badgeNFT(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const AllUserTerritoriesDocument = gql`
    query AllUserTerritories($credentials: CredentialsInput!) {
  allUserTerritories(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const CatRaffTransactionsDocument = gql`
    query CatRaffTransactions {
  catRaffTransactions {
    ...PolygonScanTransactions
  }
}
    ${PolygonScanTransactionsFragmentDoc}`;
export const UserIxtTransactionsDocument = gql`
    query UserIxtTransactions($credentials: CredentialsInput!) {
  userIxtTransactions(credentials: $credentials) {
    ...PolygonScanTransactions
  }
}
    ${PolygonScanTransactionsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Authed(variables?: AuthedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AuthedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthedQuery>(AuthedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Authed', 'query');
    },
    Land(variables: LandQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LandQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LandQuery>(LandDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Land', 'query');
    },
    Landmarks(variables: LandmarksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LandmarksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LandmarksQuery>(LandmarksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Landmarks', 'query');
    },
    AllLandmarks(variables?: AllLandmarksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllLandmarksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllLandmarksQuery>(AllLandmarksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllLandmarks', 'query');
    },
    UniqueLandWithInfo(variables: UniqueLandWithInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UniqueLandWithInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UniqueLandWithInfoQuery>(UniqueLandWithInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UniqueLandWithInfo', 'query');
    },
    UniquePixWithInfoFromId(variables: UniquePixWithInfoFromIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UniquePixWithInfoFromIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UniquePixWithInfoFromIdQuery>(UniquePixWithInfoFromIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UniquePixWithInfoFromId', 'query');
    },
    Currencies(variables: CurrenciesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CurrenciesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrenciesQuery>(CurrenciesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Currencies', 'query');
    },
    StakingData(variables: StakingDataQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StakingDataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakingDataQuery>(StakingDataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakingData', 'query');
    },
    CatRaffAccounts(variables?: CatRaffAccountsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CatRaffAccountsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CatRaffAccountsQuery>(CatRaffAccountsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CatRaffAccounts', 'query');
    },
    CatRaffPastPrizes(variables?: CatRaffPastPrizesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CatRaffPastPrizesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CatRaffPastPrizesQuery>(CatRaffPastPrizesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CatRaffPastPrizes', 'query');
    },
    CatRaffWeekly(variables?: CatRaffWeeklyQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CatRaffWeeklyQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CatRaffWeeklyQuery>(CatRaffWeeklyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CatRaffWeekly', 'query');
    },
    TotalFacilitiesMinted(variables?: TotalFacilitiesMintedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TotalFacilitiesMintedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TotalFacilitiesMintedQuery>(TotalFacilitiesMintedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TotalFacilitiesMinted', 'query');
    },
    Tokens(variables: TokensQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokensQuery>(TokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Tokens', 'query');
    },
    EthNFTs(variables: EthNfTsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EthNfTsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EthNfTsQuery>(EthNfTsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EthNFTs', 'query');
    },
    Rovers(variables: RoversQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RoversQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RoversQuery>(RoversDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Rovers', 'query');
    },
    AvatarNFT(variables: AvatarNftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AvatarNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AvatarNftQuery>(AvatarNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AvatarNFT', 'query');
    },
    GeoLotteryNFT(variables: GeoLotteryNftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GeoLotteryNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GeoLotteryNftQuery>(GeoLotteryNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GeoLotteryNFT', 'query');
    },
    TokenInfo(variables: TokenInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TokenInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenInfoQuery>(TokenInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenInfo', 'query');
    },
    TokenInfoTypeTier(variables: TokenInfoTypeTierQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TokenInfoTypeTierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenInfoTypeTierQuery>(TokenInfoTypeTierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenInfoTypeTier', 'query');
    },
    badgeNFT(variables: BadgeNftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BadgeNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BadgeNftQuery>(BadgeNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'badgeNFT', 'query');
    },
    AllUserTerritories(variables: AllUserTerritoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AllUserTerritoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AllUserTerritoriesQuery>(AllUserTerritoriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllUserTerritories', 'query');
    },
    CatRaffTransactions(variables?: CatRaffTransactionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CatRaffTransactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CatRaffTransactionsQuery>(CatRaffTransactionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CatRaffTransactions', 'query');
    },
    UserIxtTransactions(variables: UserIxtTransactionsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UserIxtTransactionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserIxtTransactionsQuery>(UserIxtTransactionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserIxtTransactions', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;