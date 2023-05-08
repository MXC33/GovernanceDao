import type { AdjustableToken } from './useAdjustableNumber'

export const Corporations = ['eternalab', 'gws', 'lucky-cat', 'mc', 'new-lands', 'y-space', 'net-empire', 'gravity-grade', 'astro-cap', 'haveblue', 'arcade'] as const

export type Corporation = typeof Corporations[number]

export interface CorporationAdjustableToken extends AdjustableToken {
  adjustable?: boolean
}
