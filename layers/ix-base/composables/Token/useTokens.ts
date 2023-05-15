import type { Ref } from 'vue'

import { kebabCaseIt, spaceCaseIt } from 'case-it'
import { FacilityId, FacilityLevelMap, FacilityNameMap, FacilityTier, FacilityTierMap } from './Types/Facility'
import { BadgeTierMap } from './Types/Badge'
import { BioModTierMap } from './Types/Biomod'
import { ContractTierMap } from './Types/Contract'
import { DroneTierMap } from './Types/Drone'
import { GenesisCorporationMap } from './Types/Genesis'
import { GravityGradeNFTType, GravityGradeNFTTypes, getGravityGradeTokenID } from './Types/GravityGrade'
import { LandType, LandTypeMap } from './Types/Land'
import { MetashareCorporationMap } from './Types/Metashare'
import { TicketTierMap } from './Types/Ticket'
import { TierId, getTierColor } from './Types/Tier'
import { useTokenInfo } from './useTokenInfo'
import { Currency } from './Types/Currency'
import { TokenId, TokenType } from './tokenMaps'


// These are decorated and mapped stuff that we don't get from the graphql
export interface TokenIdentifier {
  type: TokenType,
  tier?: TierId,
  balance?: number
  tokenId?: string | number
  currency?: Currency
}

export type TokenIdentifierWithAmount = TokenIdentifier & {
  amount?: number
}

export interface ItemWithAttributes {
  attributes?: {
    value?: string,
    traitType?: string
  }[]
}

export type TokenWithAttributes = ItemWithAttributes & TokenIdentifier

export const getTokenAttribute = (token: ItemWithAttributes, traitType: string) => {
  const attribute = token?.attributes?.find(item =>
    item?.traitType?.toLowerCase() == traitType.toLowerCase()
  )
  return attribute?.value?.toLowerCase() ?? null
}

export const useTokenBalance = (list: (Ref<TokenIdentifierWithAmount[] | TokenIdentifier[] | null>)[]) => {
  const { isSameToken } = useTokens()

  const balanceOfToken = (token: TokenIdentifier, decimalCount: number = 2) => {
    const nftList = list.flatMap((tokenList) => tokenList.value)

    const nft = nftList.find(item =>
      item && isSameToken(token, item)
    )

    if (!nft)
      return 0

    const balance =
      (nft as TokenIdentifier)?.balance ??
      (nft as TokenIdentifierWithAmount)?.amount ??
      0

    const higherDecimalCount: TokenType[] = ['astro-gold', 'astro-gold-lite']

    if (higherDecimalCount.includes(nft.type))
      return roundToDecimals(balance, decimalCount = 6)

    return roundToDecimals(balance, decimalCount)
  }

  return balanceOfToken
}


export const useTokens = () => {

  const createMCNFT = (tokenId: TokenId, balance: number = 1): TokenIdentifier | null => {
    const type = getTokenType(tokenId)
    const tier = getTokenTier(tokenId)

    if (!type)
      return null

    return {
      tokenId: String(tokenId),
      type,
      tier: tier ?? undefined,
      balance,
    }
  }


  const getTokenLevel = (token: TokenIdentifier) => {
    if (token.tokenId == undefined || null)
      return

    const tokenId = Number(token.tokenId)

    if (token.type == 'facility')
      return FacilityLevelMap[tokenId as FacilityId]
  }

  const getTokenName = (token: TokenIdentifier, useTokenDataName: boolean = true) => {
    const { data } = useTokenInfo(token)

    const reversedTypes: TokenType[] = ['cargo-drop', 'coinbase', 'arcade', 'starter-pack']

    const { tier, type } = token

    const fullName = (() => {
      if (data.value?.name && useTokenDataName)
        return data.value.name

      if (type == 'facility' && tier)
        return FacilityNameMap[tier as FacilityTier]

      if (tier)
        return reversedTypes.includes(type) ?
          `${type} ${tier}` :
          `${tier} ${type}`

      return type
    })()
    if (!fullName)
      console.log("Missing name", token)
    return spaceCaseIt(fullName ?? "")
  }

  const getTokenKey = (token: TokenIdentifier, separator: string = '-', withId?: boolean) => {
    const type = kebabCaseIt(String(token.type))
    const id = (withId && token.tokenId) ? separator + token.tokenId : ''

    if (token.tier)
      return `${type}${separator}${kebabCaseIt(String(token.tier))}${id}`
    else
      return type + id
  }

  const isSameToken = (itemA?: TokenIdentifier, itemB?: TokenIdentifier) => {
    if (!itemA || !itemB)
      return false

    const isSameType = itemA.type == itemB.type

    const hasTokenId = (item: TokenIdentifier) => item.tokenId && item.tokenId != ""

    if (isSameType && hasTokenId(itemA) && hasTokenId(itemB))
      return itemA.tokenId == itemB.tokenId

    if (itemA.tier)
      return itemA.tier == itemB.tier && isSameType
    else
      return isSameType
  }

  const isSameCurrency = (itemA?: Currency, itemB?: Currency) => {
    if (!itemA || !itemB)
      return false

    const isSameCurrency = itemA == itemB

    return isSameCurrency
  }

  return {
    getTokenLevel,
    getTokenKey,
    getTokenName,
    getTierColor,
    // createMCNFT,
    isSameToken,
    isSameCurrency,
  }
}

// Get types
export const categorizeNFTs = <T extends TokenIdentifier>(list: T[]) => {
  if (!list)
    return []

  interface CategorizedNFT {
    items: T[],
    name: string
  }

  const map: Record<string, CategorizedNFT> = {}
  list.forEach((nft) => {
    const { type: name } = nft
    if (!map[name])
      return map[name] = { name, items: [nft] }
    else
      map[name].items.push(nft)
  })
  return Object.values(map)
}


export const getNFTTokenId = (token: TokenIdentifier) => {
  const { type, tier } = token
  const tierId = String(tier)

  if (GravityGradeNFTTypes.includes(type as GravityGradeNFTType))
    return getGravityGradeTokenID(token)

  switch (type) {
    case 'm3ta-mod':
      return M3taModId
    case 'badge':
      return reverseKey(BadgeTierMap, tierId)
    case 'drone':
      return reverseKey(DroneTierMap, tierId)
    case 'metashare':
      return reverseKey(MetashareCorporationMap, tierId)
    case 'biomod':
      return reverseKey(BioModTierMap, tierId)
    case 'waste':
      return WasteId
    case 'astro-credit':
      return AstroId
    case 'blueprint':
      return BluePrintId
    case 'raffle-ticket':
      return reverseKey(TicketTierMap, tierId)
    case 'facility':
      return reverseKey(FacilityTierMap, tierId)
    case 'loot-crate':
      return LootCrateId
    case 'energy':
      return EnergyId
    case 'pix':
      return LandTypeMap[tier as LandType]
    case 'genesis':
      return reverseKey(GenesisCorporationMap, tierId)
    case 'tile-contract':
      return reverseKey(ContractTierMap, tierId)
    case 'avatar-card-pack':
      return AvatarCardPackId
    case 'aoc-badge-pack':
      return AOCBadgePackId
  }
}
