import type { TokenIdentifier } from "../useTokens"

export type AnniversaryPackTier = 'legendary' | 'rare' | 'uncommon' | 'common' | 'outlier' | 'mystery'

export type GGTiers = AnniversaryPackTier | GGPackTier | CargoTier | ArcadePackTier | StarterPackTier

export type GravityGradeNFTType = 'unused' | 'cargo-drop' | 'anniversary-pack' | 'starter-pack' | 'coinbase' | 'gg' | 'arcade'
export const GravityGradeNFTTypes: GravityGradeNFTType[] = ['unused', 'cargo-drop', 'anniversary-pack', 'starter-pack', 'coinbase', 'gg', 'arcade']

export type GGPackTier = 'small' | 'medium' | 'large'
export type GGPackTokenId = 11 | 12 | 16

export type CargoTokenId = 1 | 15
export type CargoTier = '2' | '3'

export type CoinbaseTokenId = 9 | 10
export type CoinbaseTier = '1' | '2'

export type ArcadePackTier = 'medium'
export type ArcadePackTokenId = 14

export type StarterPackTier = '1' | '2' | 'promotion'
export type StarterPackTokenId = 8 | 13 | 17

export type AnniversaryTokenId = 2 | 3 | 4 | 5 | 6 | 7

export type GravityGradeTokenId = 0 | 1 | AnniversaryTokenId | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 9999

export const getGravityGradeTokenID = (token: TokenIdentifier) => {
  const { type, tier } = token
  switch (type) {
    case 'unused':
      return 0

    case 'cargo-drop':
      return reverseKey(CargoDropTierMap, String(tier))

    case 'anniversary-pack':
      return reverseKey(AnniversaryTierMap, String(tier))

    case 'coinbase':
      return reverseKey(CoinbaseTierMap, String(tier))

    case 'gg':
      return reverseKey(GGPackTierMap, String(tier))

    case 'starter-pack':
      return reverseKey(StarterPackTierMap, String(tier))

    case 'arcade':
      return reverseKey(ArcadePackTierMap, String(tier))

  }
}



export const CoinbaseTierMap: Record<CoinbaseTokenId, CoinbaseTier> = {
  9: '1',
  10: '2'
}
export const CargoDropTierMap: Record<CargoTokenId, CargoTier> = {
  1: '2',
  15: '3',
}

export const GGPackTierMap: Record<GGPackTokenId, GGPackTier> = {
  11: 'small',
  12: 'medium',
  16: 'large'
}

export const StarterPackTierMap: Record<StarterPackTokenId, StarterPackTier> = {
  8: '1',
  13: '2',
  17: 'promotion'
}

export const ArcadePackTierMap: Record<ArcadePackTokenId, ArcadePackTier> = {
  14: 'medium',
}

export const AnniversaryTierMap: Record<AnniversaryTokenId, AnniversaryPackTier> = {
  2: 'mystery',
  3: 'outlier',
  4: 'common',
  5: 'uncommon',
  6: 'rare',
  7: 'legendary',
}

export const getGravityGradeType = (id: GravityGradeTokenId): GravityGradeNFTType | undefined => {
  if (id == 0)
    return 'unused'
  if (id == 1 || id == 15)
    return 'cargo-drop'
  if (id >= 2 && id <= 7)
    return 'anniversary-pack'
  if (id == 8 || id == 13 || id == 17)
    return 'starter-pack'
  if (id >= 9 && id <= 10)
    return 'coinbase'
  if (id == 11 || id == 12 || id == 16)
    return 'gg'
  if (id == 14)
    return 'arcade'
}

const getTier = (tokenId: GravityGradeTokenId, type: GravityGradeNFTType) => {
  switch (type) {
    case 'unused':
      return 0

    case 'cargo-drop':
      return CargoDropTierMap[tokenId as CargoTokenId]

    case 'anniversary-pack':
      return AnniversaryTierMap[tokenId as AnniversaryTokenId]

    case 'coinbase':
      return CoinbaseTierMap[tokenId as CoinbaseTokenId]

    case 'gg':
      return GGPackTierMap[tokenId as GGPackTokenId]

    case 'starter-pack':
      return StarterPackTierMap[tokenId as StarterPackTokenId]

    case 'arcade':
      return ArcadePackTierMap[tokenId as ArcadePackTokenId]

  }
}

export const getGravityGradeToken = (tokenId: GravityGradeTokenId) => {
  const type = getGravityGradeType(tokenId)
  if (!type)
    return null

  const tier = getTier(tokenId, type)
  return {
    type,
    tier
  }
}