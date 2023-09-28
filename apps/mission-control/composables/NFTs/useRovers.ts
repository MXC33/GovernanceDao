import type { CorporationPaymentToken } from '../corporations/useCorporations'

export const RoverTiers = ['rvr genesis', 'rvr piercer', 'rvr night'] as const
export type RoverTier = typeof RoverTiers[number]


export const RoverPlaycanvasTierMap: Record<RoverTier, number> = {
  'rvr genesis': 2,
  'rvr piercer': 1,
  'rvr night': 3
}

export const RoverPlaycanvasStatusMap: Record<string, number> = {
  'pristine': 0,
  'worn': 1,
  'damaged': 2,
  'wrecked': 3
}

export const getRoverWaste = (tier: string) => {
  switch (tier) {
    case 'rvr genesis': return 24
    case 'rvr piercer': return 16
    case 'rvr night': return 30
  }
}

export const getRoverWasteBRing = (tier: string) => {
  switch (tier) {
    case 'rvr genesis': return 22
    case 'rvr piercer': return 27
    case 'rvr night': return 36
  }
}

export const getRoverACRepairPrice = (status: string) => {
  switch (status) {
    case 'worn': return 30
    case 'damaged': return 80
  }
}

export const getRoverIXTRepairPrice = (status: string) => {
  switch (status) {
    case 'worn': return 1
    case 'damaged': return 2.5
  }
}

export const getRoverRenamePrice = (paymentToken: CorporationPaymentToken) => {
  switch (paymentToken.token.tokenInfo.type) {
    case 'ixt': return 25
    case 'astro-credit': return 1000
  }
}

export const isDefaultRoverName = (name: string) => {
  if (name == 'RVR Piercer' || name == 'RVR Genesis' || name == 'RVR Night')
    return true
  return false
}