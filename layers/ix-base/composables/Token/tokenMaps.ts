import { NftFragment } from "#gql"
import { BadgeId } from "./Types/Badge"
import { BioModId } from "./Types/Biomod"
import { DroneId } from "./Types/Drone"
import { FacilityId } from "./Types/Facility"
import { GravityGradeNFTType } from "./Types/GravityGrade"
import { LandType } from "./Types/Land"
import { LandMarkId } from "./Types/Landmark"
import { MetaShareId } from "./Types/Metashare"
import { TicketId } from "./Types/Ticket"
import { TierId } from "./Types/Tier"
import { TokenIdentifier } from "./useTokens"


export const M3taModId = 0
export const WasteId = 7
export const AstroId = 8
export const BluePrintId = 9
export const LootCrateId = 15
export const EnergyId = 24
export const AvatarCardPackId = 32
export const AOCBadgePackId = 51

export const AvatarIds = [...Array(316).keys()]
export const AOCBadgeIds = [...Array(69420).keys()]

export type NothingId = 99

export type TokenId = NothingId | BadgeId | DroneId | MetaShareId | BioModId | typeof WasteId | typeof AstroId | typeof BluePrintId | TicketId | FacilityId | typeof LootCrateId | typeof EnergyId | LandMarkId | typeof AvatarCardPackId | typeof AOCBadgePackId | typeof M3taModId

export const MCNFTTypes: TokenType[] = [
  'm3ta-mod',
  'badge',
  'drone',
  'waste',
  'astro-credit',
  'blueprint',
  'biomod',
  'loot-crate',
  'raffle-ticket',
  'facility',
  'energy',
  'metashare',
  'avatar-card-pack',
  'tile-contract',
  'aoc-badge-pack',
]

export type LootCrateType = 'loot-crate' | 'avatar-card-pack' | 'aoc-badge-pack'

export type TokenType = 'badge' | 'drone' | 'metashare' | 'biomod' | 'waste' | 'astro-credit' | 'blueprint' | 'raffle-ticket' | 'facility' | 'ixt' | LootCrateType | 'energy' | LandType | GravityGradeNFTType | 'landmark' | 'nothing' | 'genesis' | 'astro-gold' | 'astro-gold-lite' | 'tile-contract' | 'astro-gold-ixt' | 'rover' | 'm3ta-mod' | 'avatar' | 'aoc-badge'

export const getTokenType = (id: TokenId): TokenType | null => {
  switch (id) {
    case 0:
      return 'm3ta-mod'
    case 1:
    case 2:
    case 3:
      return 'badge'
    case 4:
    case 5:
    case 33:
      return 'drone'
    case 6:
      return 'metashare'
    case WasteId:
      return 'waste'
    case AstroId:
      return 'astro-credit'
    case BluePrintId:
      return 'blueprint'
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      return 'biomod'

    case LootCrateId:
      return 'loot-crate'

    case 16:
    case 17:
    case 18:
      return 'raffle-ticket'

    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
      return 'facility'
    case EnergyId:
      return 'energy'
    case 25:
      return 'metashare'
    case 28:
      return 'metashare'
    case 30:
      return 'metashare'
    case 32:
      return 'avatar-card-pack'
    case 35:
    case 36:
    case 37:
    case 38:
      return 'tile-contract'
    case 51:
      return 'aoc-badge-pack'
    case 99:
      return 'nothing'
  }

  return null
}


export const getTokenTier = (tokenId: TokenId): TierId | null => {
  switch (tokenId) {
    case 0:
      return null
    case 1:
    case 2:
    case 3:
      return BadgeTierMap[tokenId];

    case 4:
    case 5:
    case 33:
      return DroneTierMap[tokenId]

    case 6:
      return MetashareCorporationMap[tokenId]
    case 7:
    case 8:
    case 9:
      return null

    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      return BioModTierMap[tokenId]

    case 15:
      return null

    case 16:
    case 17:
    case 18:
      return TicketTierMap[tokenId]

    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
      return FacilityTierMap[tokenId]

    case 24:
      return null
    case 25:
      return MetashareCorporationMap[tokenId]
    case 28:
      return MetashareCorporationMap[tokenId]
    case 30:
      return MetashareCorporationMap[tokenId]
    case 32:
      return null
    case 35:
    case 36:
    case 37:
    case 38:
      return ContractTierMap[tokenId]
    case 51:
      return null
  }
  return null
}


export const parseNftFragment = (nft: NftFragment | null): TokenIdentifier | null => {
  if (!nft)
    return null

  const tokenId: TokenId = Number(nft.tokenId) as TokenId

  const type = getTokenType(tokenId)
  const tier = getTokenTier(tokenId)

  if (!type)
    return null

  return {
    tokenId,
    type,
    tier: tier ?? undefined
  }
}