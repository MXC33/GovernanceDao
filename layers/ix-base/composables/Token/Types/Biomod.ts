export type BioModId = 10 | 11 | 12 | 13 | 14

export type BioModTier = 'uncommon' | 'rare' | 'outlier' | 'common' | 'legendary'

export const BioModTierMap: Record<BioModId, BioModTier> = {
  10: "outlier",
  11: "common",
  12: "uncommon",
  13: "rare",
  14: "legendary",
}