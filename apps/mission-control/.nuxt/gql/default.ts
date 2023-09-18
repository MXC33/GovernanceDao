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
  playerId: Scalars['Int']['input'];
  walletAddress?: InputMaybe<Scalars['String']['input']>;
};

export enum LandType {
  Area = 'area',
  Domain = 'domain',
  Pix = 'pix',
  Sector = 'sector',
  Zone = 'zone'
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

export type PlayerBaseLevelQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type PlayerBaseLevelQuery = { playerBaseLevel?: number | null };

export type BaseLevelCapacitiesQueryVariables = Exact<{
  level: Scalars['Int']['input'];
}>;


export type BaseLevelCapacitiesQuery = { baseLevelCapacities?: Array<{ name: string, capacity: number } | null> | null };

export type CorporationCapacityFragment = { name: string, capacity: number };

export type BurnedAvatarQueryVariables = Exact<{
  credentials: CredentialsInput;
  corporation: Scalars['String']['input'];
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

export type MetamodFusionOrderInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type MetamodFusionOrderInfoQuery = { metamodFusionOrderInfo?: Array<{ orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null } | null> | null };

export type FacilityUpgradeCooldownQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type FacilityUpgradeCooldownQuery = { cooldownFacilityUpgrade?: number | null };

export type GlobalWasteSystemOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalWasteSystemOrderCostsQuery = { globalWasteSystemOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, fixedCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, boostedWeight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null };

export type EternaLabsOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type EternaLabsOrderCostsQuery = { eternalLabsOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, fixedCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, boostedWeight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null };

export type NewLandsOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type NewLandsOrderCostsQuery = { newlandsOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, fixedCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, boostedWeight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null };

export type FacilityUpgradeOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type FacilityUpgradeOrderCostsQuery = { facilityUpgradeOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, fixedCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, boostedWeight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null };

export type MetamodFusionOrderCostsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetamodFusionOrderCostsQuery = { metamodFusionOrderCosts?: { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, fixedCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, boostedWeight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null };

export type AssetConverterRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type AssetConverterRecipesQuery = { assetConverterRecipes?: Array<{ recipeId: number, recipe: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null>, outcome: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> } | null> | null };

export type OrderFragment = { orderId?: number | null, orderAmount?: number | null, creationTime?: number | null, amountOfSpeedups?: number | null, defaultOrderTime?: number | null, speedUpTime?: number | null, totalOrderTime?: number | null, orderTokenId?: number | null, type?: string | null };

export type OrderDataFragment = { defaultOrderTime: number, maxOrder?: number | null, ixtSpeedupCost: number, astroSpeedupCost?: number | null, ixtCooldownSpeedupCost?: number | null, cooldownSpeedupTime?: number | null, variableCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, fixedCosts?: Array<{ min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, tax?: { value?: number | null, basisPoints?: number | null } | null, weight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null, boostedWeight?: Array<{ value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null };

export type TaxFragment = { value?: number | null, basisPoints?: number | null };

export type OrderCostFragment = { min?: number | null, max?: number | null, multiplier?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null };

export type ProbabilityWeightFragment = { value: number, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null };

export type AssetConverterRecipeFragment = { recipeId: number, recipe: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null>, outcome: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> };

export type CurrenciesQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type CurrenciesQuery = { currencies?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type GravityGradeNftBalanceQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type GravityGradeNftBalanceQuery = { gravityGradeNFTBalance?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type IsGgEligibleQueryVariables = Exact<{
  credentials: CredentialsInput;
  packId: Scalars['Int']['input'];
}>;


export type IsGgEligibleQuery = { isEligible?: boolean | null };

export type GgPackContentQueryVariables = Exact<{
  token: TokenInput;
}>;


export type GgPackContentQuery = { gravityGradePackContent?: Array<{ probability?: number | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> | null };

export type SaleInfoQueryVariables = Exact<{
  shopId: Scalars['String']['input'];
}>;


export type SaleInfoQuery = { saleInfo?: Array<{ saleId?: number | null, totalSupply: number, price: number, userCap: number, sold?: number | null, inStock: boolean, unique: boolean, paymentMethod?: Array<string | null> | null, displayPrice: string, amount: number, supplyText?: string | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> | null };

export type GenericStoreSaleInfoFragment = { saleId?: number | null, totalSupply: number, price: number, userCap: number, sold?: number | null, inStock: boolean, unique: boolean, paymentMethod?: Array<string | null> | null, displayPrice: string, amount: number, supplyText?: string | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } };

export type TokenProbabilityFragment = { probability?: number | null, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } };

export type LandQueryVariables = Exact<{
  credentials: CredentialsInput;
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type LandQuery = { landAmount?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type LandmarksQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type LandmarksQuery = { landmarks?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type LuckyCatRaffleQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type LuckyCatRaffleQuery = { luckyCatRaffleInfo?: { activeRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null>, pastRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null>, upcomingRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null>, myRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null> } | null };

export type LuckyCatRaffleFragment = { activeRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null>, pastRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null>, upcomingRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null>, myRaffles: Array<{ id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } } | null> };

export type RaffleInfoFragment = { id?: number | null, entriesByWallet?: number | null, totalEntries?: number | null, isDrawn?: boolean | null, hasClaimed?: boolean | null, isWinner?: boolean | null, dailyTickets: { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } }, winnings?: Array<{ walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> } | null> | null, prize: { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> } };

export type WinningsFragment = { walletAddress: string, enteredWith: number, amount: number, prizeIds: Array<number | null> };

export type DailyTicketsFragment = { minEntriesPerWallet: number, maxEntriesPerWallet: number, maxTotalEntries: number, startTime: number, duration: number, ticket: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } };

export type PrizeFragment = { prizeAddress: string, prizeType: number, totalPrizes: number, items: Array<{ amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> };

export type PrizeItemFragment = { amount: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } };

export type UniqueLandWithInfoQueryVariables = Exact<{
  credentials: CredentialsInput;
  tier: Scalars['String']['input'];
  type: Scalars['String']['input'];
  pageKey: PageKeyInput;
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type UniqueLandWithInfoQuery = { uniqueLand?: { items?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null, pageKeys?: { elastic?: number | null, chain?: string | null } | null } | null };

export type UniquePixWithInfoFromIdQueryVariables = Exact<{
  credentials: CredentialsInput;
  pixId: Scalars['String']['input'];
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type UniquePixWithInfoFromIdQuery = { searchPixId?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type PixResultsFragment = { items?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null, pageKeys?: { elastic?: number | null, chain?: string | null } | null };

export type PageKeyFragment = { elastic?: number | null, chain?: string | null };

export type RelayerFeeQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type RelayerFeeQuery = { relayerFee?: string | null };

export type StakedOnTileQueryVariables = Exact<{
  credentials: CredentialsInput;
  tiles: Array<TileInput> | TileInput;
}>;


export type StakedOnTileQuery = { stakedOnTile?: Array<{ isRented: boolean, rentPrice?: string | null, rentalToken: string, tileName?: string | null, ring?: string | null, tiles?: { q: number, r: number, s: number } | null, base?: { stakedAddress?: string | null, nonce?: number | null, land?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null, top?: Array<{ stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, resourceAmount?: number | null, progress?: number | null, finishTime?: string | null, cap?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null> | null };

export type OldStakedOnTileQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type OldStakedOnTileQuery = { oldStakedOnTile?: Array<{ isRented: boolean, rentPrice?: string | null, rentalToken: string, tileName?: string | null, ring?: string | null, tiles?: { q: number, r: number, s: number } | null, base?: { stakedAddress?: string | null, nonce?: number | null, land?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null, top?: Array<{ stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, resourceAmount?: number | null, progress?: number | null, finishTime?: string | null, cap?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null } | null> | null };

export type WasteNonceQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type WasteNonceQuery = { wasteNonce?: number | null };

export type OldWasteNonceQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type OldWasteNonceQuery = { oldWasteNonce?: number | null };

export type TileFragment = { q: number, r: number, s: number };

export type StakedNftFragment = { isRented: boolean, rentPrice?: string | null, rentalToken: string, tileName?: string | null, ring?: string | null, tiles?: { q: number, r: number, s: number } | null, base?: { stakedAddress?: string | null, nonce?: number | null, land?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null, top?: Array<{ stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, resourceAmount?: number | null, progress?: number | null, finishTime?: string | null, cap?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null } | null> | null };

export type StakedPixInfoFragment = { stakedAddress?: string | null, nonce?: number | null, land?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null };

export type StakedTopAssetInfoFragment = { stakedAddress?: string | null, nonce?: number | null, timeLeft?: number | null, index?: number | null, resourceAmount?: number | null, progress?: number | null, finishTime?: string | null, cap?: number | null, token?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null, resource?: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null };

export type StakedMcnftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type StakedMcnftQuery = { stakedMCNFTs?: Array<{ amount: number, lockedAt: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> | null };

export type StakedGenesisNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type StakedGenesisNftQuery = { stakedGenesisNFTs?: Array<{ amount: number, lockedAt: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> | null };

export type StakedGenesisNftEthQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type StakedGenesisNftEthQuery = { stakedGenesisNFTsEth?: Array<{ amount: number, lockedAt: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } } | null> | null };

export type StakedMcnftInfoFragment = { amount: number, lockedAt: number, token: { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } };

export type TokensQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type TokensQuery = { missionControlTokens?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type EthNfTsQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type EthNfTsQuery = { ethNFTs?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type RoversQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type RoversQuery = { rover?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type AvatarNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type AvatarNftQuery = { avatarNFT?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type TokenInfoQueryVariables = Exact<{
  tokenIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  contractAddress: Scalars['String']['input'];
}>;


export type TokenInfoQuery = { tokenInfo?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type TokenInfoTypeTierQueryVariables = Exact<{
  tokens: Array<TokenInput> | TokenInput;
  contractAddress: Scalars['String']['input'];
  chain?: InputMaybe<Scalars['String']['input']>;
}>;


export type TokenInfoTypeTierQuery = { tokenInfoTypeTier?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type BadgeNftQueryVariables = Exact<{
  credentials: CredentialsInput;
}>;


export type BadgeNftQuery = { badgeNFT?: Array<{ contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null } | null> | null };

export type NftFragment = { contract?: string | null, tokenType?: string | null, external_url?: string | null, tokenId?: number | null, balance?: number | null, network?: string | null, tokenInfo?: { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null } | null, media?: { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null } | null, mintInfo?: { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null } | null };

export type TokenInfoFragment = { title?: string | null, tier?: string | null, type: string, status?: string | null, description?: string | null, staked?: boolean | null, minted?: boolean | null, inspectorLink?: string | null, level?: number | null, openable?: boolean | null, attributes?: Array<{ value?: string | null, traitType?: string | null } | null> | null };

export type AttributeFragment = { value?: string | null, traitType?: string | null };

export type MediaFragment = { animation_url?: string | null, image?: string | null, mcIcon?: string | null, mcImage?: string | null, mcVideo?: string | null, alchemyThumbnail?: string | null, alchemy?: string | null };

export type MintInfoFragment = { pix_id?: string | null, category_id?: string | null, merkle_index?: string | null };

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
export const OrderCostFragmentDoc = gql`
    fragment OrderCost on OrderCost {
  token {
    ...NFT
  }
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
export const ProbabilityWeightFragmentDoc = gql`
    fragment ProbabilityWeight on ProbabilityWeights {
  token {
    ...NFT
  }
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
    ...ProbabilityWeight
  }
  boostedWeight {
    ...ProbabilityWeight
  }
}
    `;
export const AssetConverterRecipeFragmentDoc = gql`
    fragment AssetConverterRecipe on AssetConverterRecipe {
  recipeId
  recipe {
    ...NFT
  }
  outcome {
    ...NFT
  }
}
    `;
export const GenericStoreSaleInfoFragmentDoc = gql`
    fragment GenericStoreSaleInfo on GenericStoreSaleInfo {
  saleId
  totalSupply
  price
  userCap
  sold
  inStock
  unique
  paymentMethod
  displayPrice
  amount
  supplyText
  token {
    ...NFT
  }
}
    `;
export const TokenProbabilityFragmentDoc = gql`
    fragment TokenProbability on TokenProbability {
  token {
    ...NFT
  }
  probability
}
    `;
export const DailyTicketsFragmentDoc = gql`
    fragment DailyTickets on DailyTickets {
  ticket {
    ...NFT
  }
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
}
    `;
export const PrizeItemFragmentDoc = gql`
    fragment PrizeItem on PrizeItem {
  token {
    ...NFT
  }
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
  hasClaimed
  isWinner
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
export const TileFragmentDoc = gql`
    fragment Tile on Tile {
  q
  r
  s
}
    `;
export const StakedPixInfoFragmentDoc = gql`
    fragment StakedPixInfo on StakedPixInfo {
  stakedAddress
  nonce
  land {
    ...NFT
  }
  resource {
    ...NFT
  }
}
    `;
export const StakedTopAssetInfoFragmentDoc = gql`
    fragment StakedTopAssetInfo on StakedTopAssetInfo {
  stakedAddress
  token {
    ...NFT
  }
  nonce
  timeLeft
  resource {
    ...NFT
  }
  index
  resourceAmount
  progress
  finishTime
  cap
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
  tileName
  ring
}
    `;
export const StakedMcnftInfoFragmentDoc = gql`
    fragment StakedMCNFTInfo on StakedMCNFTInfo {
  token {
    ...NFT
  }
  amount
  lockedAt
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
export const MetamodFusionOrderInfoDocument = gql`
    query MetamodFusionOrderInfo($credentials: CredentialsInput!) {
  metamodFusionOrderInfo(credentials: $credentials) {
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
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightFragmentDoc}`;
export const EternaLabsOrderCostsDocument = gql`
    query EternaLabsOrderCosts {
  eternalLabsOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightFragmentDoc}`;
export const NewLandsOrderCostsDocument = gql`
    query NewLandsOrderCosts {
  newlandsOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightFragmentDoc}`;
export const FacilityUpgradeOrderCostsDocument = gql`
    query FacilityUpgradeOrderCosts {
  facilityUpgradeOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightFragmentDoc}`;
export const MetamodFusionOrderCostsDocument = gql`
    query MetamodFusionOrderCosts {
  metamodFusionOrderCosts {
    ...OrderData
  }
}
    ${OrderDataFragmentDoc}
${OrderCostFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${TaxFragmentDoc}
${ProbabilityWeightFragmentDoc}`;
export const AssetConverterRecipesDocument = gql`
    query AssetConverterRecipes {
  assetConverterRecipes {
    ...AssetConverterRecipe
  }
}
    ${AssetConverterRecipeFragmentDoc}
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
export const GravityGradeNftBalanceDocument = gql`
    query GravityGradeNFTBalance($credentials: CredentialsInput!) {
  gravityGradeNFTBalance(credentials: $credentials) {
    ...NFT
  }
}
    ${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const IsGgEligibleDocument = gql`
    query IsGGEligible($credentials: CredentialsInput!, $packId: Int!) {
  isEligible(credentials: $credentials, packId: $packId)
}
    `;
export const GgPackContentDocument = gql`
    query GGPackContent($token: TokenInput!) {
  gravityGradePackContent(token: $token) {
    ...TokenProbability
  }
}
    ${TokenProbabilityFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const SaleInfoDocument = gql`
    query SaleInfo($shopId: String!) {
  saleInfo(shopId: $shopId) {
    ...GenericStoreSaleInfo
  }
}
    ${GenericStoreSaleInfoFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
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
export const LuckyCatRaffleDocument = gql`
    query LuckyCatRaffle($credentials: CredentialsInput!) {
  luckyCatRaffleInfo(credentials: $credentials) {
    ...LuckyCatRaffle
  }
}
    ${LuckyCatRaffleFragmentDoc}
${RaffleInfoFragmentDoc}
${DailyTicketsFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
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
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${StakedTopAssetInfoFragmentDoc}`;
export const OldStakedOnTileDocument = gql`
    query OldStakedOnTile($credentials: CredentialsInput!) {
  oldStakedOnTile(credentials: $credentials) {
    ...StakedNFT
  }
}
    ${StakedNftFragmentDoc}
${TileFragmentDoc}
${StakedPixInfoFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}
${StakedTopAssetInfoFragmentDoc}`;
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
    ${StakedMcnftInfoFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const StakedGenesisNftDocument = gql`
    query StakedGenesisNFT($credentials: CredentialsInput!) {
  stakedGenesisNFTs(credentials: $credentials) {
    ...StakedMCNFTInfo
  }
}
    ${StakedMcnftInfoFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
export const StakedGenesisNftEthDocument = gql`
    query StakedGenesisNFTEth($credentials: CredentialsInput!) {
  stakedGenesisNFTsEth(credentials: $credentials) {
    ...StakedMCNFTInfo
  }
}
    ${StakedMcnftInfoFragmentDoc}
${NftFragmentDoc}
${TokenInfoFragmentDoc}
${AttributeFragmentDoc}
${MediaFragmentDoc}
${MintInfoFragmentDoc}`;
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Authed(variables?: AuthedQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AuthedQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthedQuery>(AuthedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Authed', 'query');
    },
    PlayerBaseLevel(variables: PlayerBaseLevelQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PlayerBaseLevelQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PlayerBaseLevelQuery>(PlayerBaseLevelDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'PlayerBaseLevel', 'query');
    },
    BaseLevelCapacities(variables: BaseLevelCapacitiesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BaseLevelCapacitiesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BaseLevelCapacitiesQuery>(BaseLevelCapacitiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BaseLevelCapacities', 'query');
    },
    BurnedAvatar(variables: BurnedAvatarQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BurnedAvatarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BurnedAvatarQuery>(BurnedAvatarDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'BurnedAvatar', 'query');
    },
    GlobalWasteSystemOrderInfo(variables: GlobalWasteSystemOrderInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GlobalWasteSystemOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GlobalWasteSystemOrderInfoQuery>(GlobalWasteSystemOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GlobalWasteSystemOrderInfo', 'query');
    },
    EternaLabsOrderInfo(variables: EternaLabsOrderInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EternaLabsOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EternaLabsOrderInfoQuery>(EternaLabsOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EternaLabsOrderInfo', 'query');
    },
    NewLandsOrderInfo(variables: NewLandsOrderInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NewLandsOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewLandsOrderInfoQuery>(NewLandsOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NewLandsOrderInfo', 'query');
    },
    FacilityUpgradeOrderInfo(variables: FacilityUpgradeOrderInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FacilityUpgradeOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FacilityUpgradeOrderInfoQuery>(FacilityUpgradeOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FacilityUpgradeOrderInfo', 'query');
    },
    MetamodFusionOrderInfo(variables: MetamodFusionOrderInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MetamodFusionOrderInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MetamodFusionOrderInfoQuery>(MetamodFusionOrderInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MetamodFusionOrderInfo', 'query');
    },
    FacilityUpgradeCooldown(variables: FacilityUpgradeCooldownQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FacilityUpgradeCooldownQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FacilityUpgradeCooldownQuery>(FacilityUpgradeCooldownDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FacilityUpgradeCooldown', 'query');
    },
    GlobalWasteSystemOrderCosts(variables?: GlobalWasteSystemOrderCostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GlobalWasteSystemOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GlobalWasteSystemOrderCostsQuery>(GlobalWasteSystemOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GlobalWasteSystemOrderCosts', 'query');
    },
    EternaLabsOrderCosts(variables?: EternaLabsOrderCostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<EternaLabsOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EternaLabsOrderCostsQuery>(EternaLabsOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'EternaLabsOrderCosts', 'query');
    },
    NewLandsOrderCosts(variables?: NewLandsOrderCostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<NewLandsOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NewLandsOrderCostsQuery>(NewLandsOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'NewLandsOrderCosts', 'query');
    },
    FacilityUpgradeOrderCosts(variables?: FacilityUpgradeOrderCostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<FacilityUpgradeOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FacilityUpgradeOrderCostsQuery>(FacilityUpgradeOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'FacilityUpgradeOrderCosts', 'query');
    },
    MetamodFusionOrderCosts(variables?: MetamodFusionOrderCostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MetamodFusionOrderCostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MetamodFusionOrderCostsQuery>(MetamodFusionOrderCostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'MetamodFusionOrderCosts', 'query');
    },
    AssetConverterRecipes(variables?: AssetConverterRecipesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AssetConverterRecipesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AssetConverterRecipesQuery>(AssetConverterRecipesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AssetConverterRecipes', 'query');
    },
    Currencies(variables: CurrenciesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CurrenciesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrenciesQuery>(CurrenciesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Currencies', 'query');
    },
    GravityGradeNFTBalance(variables: GravityGradeNftBalanceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GravityGradeNftBalanceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GravityGradeNftBalanceQuery>(GravityGradeNftBalanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GravityGradeNFTBalance', 'query');
    },
    IsGGEligible(variables: IsGgEligibleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<IsGgEligibleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<IsGgEligibleQuery>(IsGgEligibleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'IsGGEligible', 'query');
    },
    GGPackContent(variables: GgPackContentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GgPackContentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GgPackContentQuery>(GgPackContentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GGPackContent', 'query');
    },
    SaleInfo(variables: SaleInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SaleInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SaleInfoQuery>(SaleInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SaleInfo', 'query');
    },
    Land(variables: LandQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LandQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LandQuery>(LandDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Land', 'query');
    },
    Landmarks(variables: LandmarksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LandmarksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LandmarksQuery>(LandmarksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Landmarks', 'query');
    },
    LuckyCatRaffle(variables: LuckyCatRaffleQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LuckyCatRaffleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LuckyCatRaffleQuery>(LuckyCatRaffleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LuckyCatRaffle', 'query');
    },
    UniqueLandWithInfo(variables: UniqueLandWithInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UniqueLandWithInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UniqueLandWithInfoQuery>(UniqueLandWithInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UniqueLandWithInfo', 'query');
    },
    UniquePixWithInfoFromId(variables: UniquePixWithInfoFromIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UniquePixWithInfoFromIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UniquePixWithInfoFromIdQuery>(UniquePixWithInfoFromIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UniquePixWithInfoFromId', 'query');
    },
    RelayerFee(variables: RelayerFeeQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<RelayerFeeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<RelayerFeeQuery>(RelayerFeeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RelayerFee', 'query');
    },
    StakedOnTile(variables: StakedOnTileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StakedOnTileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedOnTileQuery>(StakedOnTileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedOnTile', 'query');
    },
    OldStakedOnTile(variables: OldStakedOnTileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OldStakedOnTileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OldStakedOnTileQuery>(OldStakedOnTileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OldStakedOnTile', 'query');
    },
    WasteNonce(variables: WasteNonceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<WasteNonceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<WasteNonceQuery>(WasteNonceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'WasteNonce', 'query');
    },
    OldWasteNonce(variables: OldWasteNonceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<OldWasteNonceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OldWasteNonceQuery>(OldWasteNonceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'OldWasteNonce', 'query');
    },
    StakedMCNFT(variables: StakedMcnftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StakedMcnftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedMcnftQuery>(StakedMcnftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedMCNFT', 'query');
    },
    StakedGenesisNFT(variables: StakedGenesisNftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StakedGenesisNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedGenesisNftQuery>(StakedGenesisNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedGenesisNFT', 'query');
    },
    StakedGenesisNFTEth(variables: StakedGenesisNftEthQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<StakedGenesisNftEthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StakedGenesisNftEthQuery>(StakedGenesisNftEthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StakedGenesisNFTEth', 'query');
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
    TokenInfo(variables: TokenInfoQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TokenInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenInfoQuery>(TokenInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenInfo', 'query');
    },
    TokenInfoTypeTier(variables: TokenInfoTypeTierQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TokenInfoTypeTierQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenInfoTypeTierQuery>(TokenInfoTypeTierDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TokenInfoTypeTier', 'query');
    },
    badgeNFT(variables: BadgeNftQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<BadgeNftQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<BadgeNftQuery>(BadgeNftDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'badgeNFT', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;