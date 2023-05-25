import { TokenType } from "./tokenMaps"
import { AnyToken, TokenIdentifier } from "./useTokens"

const imageTokens = ['pix', 'anniversary-pack', 'loot-crate', 'starter-pack', 'coinbase', 'gg', 'arcade', 'tile-contract', 'cargo-drop', 'avatar', 'aoc-badge'] as TokenType[]

export const useTokenMedia = () => {
  const { addCacheKey } = useCacheKey()

  const getTokenIdentifierImage = async (token: TokenIdentifier, large?: boolean) => {
    const { execute: fetchTokenInfodata, data } = useTokenInfo(token)

    await (fetchTokenInfodata())

    const externalURL = large ? data.value?.image : data.value?.icon

    if (externalURL)
      return externalURL

    const imagePath = (() => {
      const sizePath = large ? 'image' : 'icon'
      const tier = token.tier ? `-${token.tier}` : ''

      return `/nft/images/${token.type}/${sizePath}${tier}.png`
    })()

    return addCacheKey(imagePath)
  }

  const getTokenIdentifierVideo = async (token: TokenIdentifier) => {
    const config = useRuntimeConfig().public

    const { execute: fetchTokenInfodata, data } = useTokenInfo(token)
    await fetchTokenInfodata()

    const externalURL = data.value?.video

    const videoPath = (() => {
      const { tier, type } = token
      const tierId = tier ? `${tier}` : `${type}`
      return `/nft/video/${type}/${tierId}.mp4`
    })()

    if (externalURL)
      return externalURL
    return config.s3 + addCacheKey(videoPath)
  }

  const tokenHasVideo = (token: AnyToken) => {
    if (isIXToken(token))
      return !!token.video

    return !imageTokens.includes(token.type)
  }

  const getTokenVideoURL = async (token: AnyToken) => {
    if (!isIXToken(token))
      return await getTokenIdentifierVideo(token)

    return token.video
  }


  const getTokenImageURL = async (token: AnyToken, large?: boolean) => {
    if (!isIXToken(token))
      return await getTokenIdentifierImage(token)

    const { image, icon, thumbnail } = token

    if (large)
      return image

    if (icon && !icon.includes("https://ipfs.io"))
      return icon

    else if (thumbnail )
      return thumbnail

    return image
  }


  return {
    getTokenImageURL,
    getTokenVideoURL,
    tokenHasVideo,
    imageTokens
  }
}
