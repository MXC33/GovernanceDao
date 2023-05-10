export const RoverTiers = ['rvr genesis', 'rvr piercer', 'rvr night'] as const
export type RoverTier = typeof RoverTiers[number]
export type RoverStatus = 'pristine' | 'worn' | 'damaged' | 'wrecked'

export const RoverPlaycanvasTierMap: Record<RoverTier, number> = {
  'rvr genesis': 2,
  'rvr piercer': 1,
  'rvr night': 3
}

export const RoverPlaycanvasStatusMap: Record<RoverStatus, number> = {
  'pristine': 0,
  'worn': 1,
  'damaged': 2,
  'wrecked': 3
}

export const isDefaultRoverName = (name: string) => {
  if (name == 'RVR Piercer' || name == 'RVR Genesis' || name == 'RVR Night')
    return true
  return false
}