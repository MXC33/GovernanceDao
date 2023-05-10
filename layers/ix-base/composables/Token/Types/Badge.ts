export type BadgeId = 1 | 2 | 3

export type BadgeTier = 'gold' | 'silver' | 'bronze'

export const BadgeTierMap: Record<BadgeId, BadgeTier> = {
  1: "gold",
  2: "silver",
  3: "bronze"
}
