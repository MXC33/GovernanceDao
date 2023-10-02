import { NftFragment } from '#gql'
import { TileRing } from '../useTiles'
import { LandType } from './useLand'

export type FacilityTier = 'outlier' | 'common' | 'uncommon' | 'rare' | 'legendary'
export const FacilityLevels = [1, 2, 3, 4, 5] as const
export type FacilityLevel = typeof FacilityLevels[number]


export const FacilityTokenIdMap: Record<FacilityTier, Record<FacilityLevel, number>> = {
  "outlier": {
    1: 19,
    2: 52,
    3: 57,
    4: 62,
    5: 67
  },
  "common": {
    1: 20,
    2: 53,
    3: 58,
    4: 63,
    5: 68
  },
  "uncommon": {
    1: 21,
    2: 54,
    3: 59,
    4: 64,
    5: 69
  },
  "rare": {
    1: 22,
    2: 55,
    3: 60,
    4: 65,
    5: 70
  },
  "legendary": {
    1: 23,
    2: 56,
    3: 61,
    4: 66,
    5: 71
  },
}


export const FacilityLevelMap: Record<number, number> = {
  19: 1,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  52: 2,
  53: 2,
  54: 2,
  55: 2,
  56: 2,
  57: 3,
  58: 3,
  59: 3,
  60: 3,
  61: 3,
  62: 4,
  63: 4,
  64: 4,
  65: 4,
  66: 4,
  67: 5,
  68: 5,
  69: 5,
  70: 5,
  71: 5,
}



export type RingOutputs = Partial<Record<TileRing, number>>

export const FacilityOutputCycle: Record<FacilityTier, RingOutputs> = {
  outlier: {
    A: 24,
    B: 21.6,
    C1: 21.6,
    C2: 19.2,
  },
  common: {
    A: 20,
    B: 18,
    C1: 18,
    C2: 16
  },
  uncommon: {
    A: 16,
    B: 14.4,
    C1: 14.4,
    C2: 12.8
  },
  rare: {
    A: 12,
    B: 10.8,
    C1: 10.8,
    C2: 9.6
  },
  legendary: {
    A: 8,
    B: 7.2,
    C1: 7.2,
    C2: 6.4
  },
}

export const LandTypeEnergyMap: Record<LandType, number> = {
  cluster: 0,
  none: 0,
  pix: 1,
  area: 3,
  sector: 4,
  zone: 5,
  domain: 6,
}

export const FacilityEnergyByLevelMultiplier: Record<FacilityLevel, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16
}

export const FacilityTierMap: Record<number, FacilityTier> = {
  19: "outlier",
  20: "common",
  21: "uncommon",
  22: "rare",
  23: "legendary",
  52: "outlier",
  53: "common",
  54: "uncommon",
  55: "rare",
  56: "legendary",
  57: "outlier",
  58: "common",
  59: "uncommon",
  60: "rare",
  61: "legendary",
  62: "outlier",
  63: "common",
  64: "uncommon",
  65: "rare",
  66: "legendary",
  67: "outlier",
  68: "common",
  69: "uncommon",
  70: "rare",
  71: "legendary",
} as const



export const getNextLevelTokenIds = (facilityId: number, facilityTier: FacilityTier): number[] => {
  const currentLevel = Object.values(FacilityTokenIdMap[facilityTier]).indexOf(facilityId);
  if (currentLevel === -1 || currentLevel >= 4) {
    return [Object.values(FacilityTokenIdMap[facilityTier])[currentLevel] + 5]
  }
  return Object.values(FacilityTokenIdMap[facilityTier]).slice(currentLevel + 1, currentLevel + 5);
}