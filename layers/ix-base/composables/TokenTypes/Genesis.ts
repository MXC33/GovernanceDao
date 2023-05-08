
export type GenesisCorporation = 'lucky-cat' | 'new-lands' | 'y-space' | 'gws' | 'eternalab'
export const GenesisIds = [1, 2, 3, 4, 5] as const
export type GenesisId = typeof GenesisIds[number]

export const GenesisCorporationMap: Record<GenesisId, GenesisCorporation> = {
  1: 'lucky-cat',
  2: 'y-space',
  3: 'new-lands',
  4: 'gws',
  5: 'eternalab'
} as const

export const CorporationGenesisMap = (() =>
  GenesisIds.map((id) => ({
    [GenesisCorporationMap[id]]: (id as GenesisId)
  }))
)()