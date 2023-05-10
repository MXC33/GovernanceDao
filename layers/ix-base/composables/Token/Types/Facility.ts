export type FacilityTier = 'outlier' | 'common' | 'uncommon' | 'rare' | 'legendary'
export const FacilityLevels = [1, 2, 3, 4, 5] as const

export type FacilityId = 19 | 20 | 21 | 22 | 23 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71

export type FacilityLevel = typeof FacilityLevels[number]

export const FacilityIds: FacilityId[] = [19, 20, 21, 22, 23, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,]

export const FacilityTierMap: Record<FacilityId, FacilityTier> = {
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

}

export const FacilityTokenIdMap: Record<FacilityTier, Record<FacilityLevel, FacilityId>> = {
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

export const FacilityNameMap: Record<FacilityTier, string> = {
  legendary: "fusion core",
  rare: "radiant gardens",
  uncommon: "tidal turbines",
  common: "thermal well",
  outlier: "solar grid"
}

export const FacilityLevelMap: Record<FacilityId, number> = {
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

export const FacilityOutputCycle: Record<FacilityTier, number> = {
  outlier: 24,
  common: 20,
  uncommon: 16,
  legendary: 8,
  rare: 12
}