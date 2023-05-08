import { gravityGradeAddress, assetsAddress, landmarkAddress, roverAddress, avatarNFTAddress, badgeNFTAddress, pixAdress } from "./Contract/WalletAddresses"
import { GravityGradeNFTType, GravityGradeNFTTypes } from "./TokenTypes/GravityGrade"
import { LandTypes, LandType } from "./TokenTypes/Land"
import { MCNFTTypes, TokenIdentifier, getNFTTokenId, useTokens } from "./useTokens"

const getContractForToken = (token: TokenIdentifier): string | undefined => {
  if (!token)
    return undefined

  const { getChain } = useWallet()
  if (GravityGradeNFTTypes.includes(token.type as GravityGradeNFTType))
    return gravityGradeAddress.polygon

  // MC ASSETS
  if (MCNFTTypes.includes(token.type)) {
    return assetsAddress.polygon
  }

  if (token.type == 'landmark') {
    return landmarkAddress.polygon
  }

  if (token.type == 'rover') {
    return roverAddress[getChain('polygon')]
  }

  if (token.type == 'avatar') {
    return avatarNFTAddress.polygon
  }

  if (token.type == 'aoc-badge') {
    return badgeNFTAddress.polygon
  }

  if (LandTypes.includes(token.type as LandType)) {
    return pixAdress.polygon
  }
}

const transformIPFS = (value: string, isVideo?: boolean) => {
  if (!value)
    return null

  const [protocol, path] = value.split("://")

  switch (protocol) {
    case 'http':
    case 'https':
      return value
    case 'ipfs':
      return `${isVideo ? IPFSURLVideo : IPFSURL}${path}`
  }

}

export const useTokenInfo = (token: TokenIdentifier) => {
  const contractAddress = getContractForToken(token)
  let tokenId = Number(getNFTTokenId(token))
  const { getTokenKey } = useTokens()

  if (token.tokenId) {
    tokenId = Number(token.tokenId)
  }

  const fetchTokenInfo = async () => {
    if (LandTypes.includes(token.type as LandType))
      return null

    if ((tokenId || tokenId == 0) && contractAddress)
      return await GqlTokenInfo({ tokenIds: [Number(tokenId)], contractAddress })
    else
      return null
  }
  const key = `token-info-data-${getTokenKey(token)}-${tokenId},`

  return useAsyncState(key, async () => {
    try {
      return fetchTokenInfo()
    } catch (error) {
      console.log("Error fetching", error)
      return null
    }
  }, {
    transform: (data) => {
      const tokenData = (data?.tokenInfo ?? [])[0]
      if (!tokenData)
        return null

      return {
        ...tokenData,
        icon: transformIPFS(tokenData.mcMedia.icon || tokenData.media.image),
        image: transformIPFS(tokenData.mcMedia?.image || tokenData.media.image),
        video: transformIPFS(tokenData.mcMedia?.video || tokenData.media.animation_url, true)
      }
    }
  })
}
