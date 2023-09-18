

export type TierColor = 'purple' | 'gold' | 'white' | 'green' | 'blue' | 'orange'

export const TierColorMap: Partial<Record<string, TierColor>> = {
  'bronze': 'green',
  'silver': 'purple',
  'gold': 'gold',

  'genesis': 'purple',
  'piercer': 'blue',
  'night': 'purple',

  'rvr genesis': 'purple',
  'rvr piercer': 'blue',
  'rvr night': 'purple',

  'common': 'green',
  'uncommon': 'blue',
  'rare': 'purple',
  'legendary': 'gold',
  'outlier': 'white',

  'regular': 'green',
  'premium': 'purple',

  'mystery': 'white',

  'new-lands': 'gold',
  'y-space': 'gold',
  'lucky-cat': 'gold',

}

export const TierHexColorMap: Record<TierColor, string> = {
  'green': '#009436',
  'blue': '#4057F8',
  'purple': '#A54BBC',
  'gold': '#FFAB00',
  'white': '#FFFFFF',
  'orange': '#FF6647',
}

export const getTierColor = (tier: string, asHex: Boolean = false): string => {
  const color = TierColorMap[tier] ?? 'orange'
  return asHex ? TierHexColorMap[color] : color
}
