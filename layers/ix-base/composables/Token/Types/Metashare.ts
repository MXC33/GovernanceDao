
export type MetashareCorporation = 'lucky-cat' | 'new-lands' | 'y-space' | 'gws'

export type MetaShareId = 6 | 25 | 28 | 30

export const MetashareCorporationMap: Record<MetaShareId, MetashareCorporation> = {
  6: 'y-space',
  25: 'lucky-cat',
  28: 'new-lands',
  30: 'gws',
}
