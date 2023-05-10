export type PixTier = 'legendary' | 'rare' | 'uncommon' | 'common' | 'outlier'

export type LandType = 'none' | 'pix' | 'area' | 'sector' | 'zone' | 'domain' | 'cluster'

export const LandTypes: LandType[] = ['pix', 'area', 'sector', 'zone', 'domain']

export const TerritoryTypes: LandType[] = ['area', 'sector', 'zone', 'domain']

export type PixType = PixTier | 'empty' | 'invisible' | 'middleSlot' | 'company'

export const LandTypeMap: Record<LandType, number> = {
  none: 0,
  pix: 1,
  cluster: 2,
  area: 3,
  sector: 4,
  zone: 5,
  domain: 6
}

export const PixTypes: Record<PixType, number> = {
  'legendary': 5,
  'rare': 4,
  'uncommon': 3,
  'common': 2,
  'outlier': 1,
  'empty': 0,
  'invisible': 8,
  'middleSlot': 6,
  'company': 7
}