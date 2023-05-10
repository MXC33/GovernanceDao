export type TicketTier = 'regular' | 'premium' | 'gold'
export type TicketId = 16 | 17 | 18

export const TicketTierMap: Record<TicketId, TicketTier> = {
  16: "regular",
  17: "premium",
  18: "gold"
}