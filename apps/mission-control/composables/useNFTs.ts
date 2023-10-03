import type { NftFragment } from '#gql'
import type { Currency } from './corporations/useCorporationShop'
import { kebabCaseIt, spaceCaseIt } from 'case-it'


export const useTokenBalance = (list: NftFragment[]) => {
  const { isSameNFT } = useNFTs()

  const balanceOfToken = (token: NftFragment, decimalCount: number = 2) => {
    const nftList = list.flatMap((tokenList) => tokenList)

    const nft = nftList.find(item =>
      isSameNFT(token, item)
    )

    if (!nft)
      return 0

    const balance = nft.balance ?? 0

    const higherDecimalCount: String[] = ['astro-gold', 'astro-gold-lite']

    if (higherDecimalCount.includes(nft?.tokenInfo?.type))
      return roundToDecimals(balance, decimalCount = 6)

    return roundToDecimals(balance, decimalCount)
  }

  return balanceOfToken
}


export const useNFTs = () => {

  const getNftTokenKey = ({ tokenId, contract }: NftFragment, separator: string = '-', withId?: boolean) => {
    return `${tokenId}${separator}${contract}`
  }
  const getTokenTier = ({ tokenInfo: { type, tier } }: NftFragment) => {
    return [type, tier].filter(Boolean).join('-')
  }

  const isSameNFT = (itemA?: NftFragment, itemB?: NftFragment) => {
    if (!itemA || !itemB)
      return false

    const isSameType = itemA?.tokenInfo?.type == itemB?.tokenInfo?.type

    const hasTokenId = (item: NftFragment) => item.tokenId && item.tokenId != null

    if (isSameType && hasTokenId(itemA) && hasTokenId(itemB))
      return itemA.tokenId == itemB.tokenId

    if (itemA?.tokenInfo?.tier)
      return itemA?.tokenInfo?.tier == itemB?.tokenInfo?.tier && isSameType
    else
      return isSameType
  }

  const getTokenAttribute = (item: NftFragment, attribute: string) =>
    item.tokenInfo?.attributes?.find((attr) =>
      attr.traitType?.toLowerCase() == attribute.toLowerCase()
    )?.value


  return {
    getTokenTier,
    getNftTokenKey,
    getTierColor,
    getTokenAttribute,
    isSameNFT,
  }
}