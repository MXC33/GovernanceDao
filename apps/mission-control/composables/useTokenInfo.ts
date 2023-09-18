import { TokenInfoFragment } from "#gql"

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

export interface TokenTypeTier {
  type: string,
  tier?: string
}

export const useTokenInfoTypeTier = (tokens: TokenTypeTier[], address = assetsAddress.polygon) => {
  const keyMap = tokens.map((token) => `${token.type}-${token.tier}`).join('-')

  return useAsyncState(`token-info-data-${keyMap}`, async () => {
    try {
      const contractAddress = address.toLowerCase()
      return await GqlTokenInfoTypeTier({ tokens, contractAddress })
    } catch (error) {
      console.log("Error fetching", error)
      return null
    }
  }, {
    transform: (data) => data.tokenInfoTypeTier
  })
}

export const useTokensInfo = (tokenIds: number[], contractAddress: string = assetsAddress.polygon) => {
  const { getNftTokenKey } = useNFTs()
  const contract = contractAddress.toLowerCase()

  const fetchTokenInfo = async () => {
    const tokenData = await GqlTokenInfo({ tokenIds, contractAddress: contract })
    return tokenData.tokenInfo
  }

  const keyMap = tokenIds.map((tokenId) => getNftTokenKey({ tokenId, contract })).join('-')

  return useAsyncState(`token-info-data-${keyMap}`, async () => {
    try {
      return (await fetchTokenInfo()) ?? []
    } catch (error) {
      console.log("Error fetching", error)
      return null
    }
  })
}


export const useTokenInfo = (tokenId: number, contractAddress: string = assetsAddress.polygon) => {
  const { getNftTokenKey } = useNFTs()
  const contractAddressLC = contractAddress.toLowerCase()

  const fetchTokenInfo = async () => {
    if ((tokenId || tokenId == 0) && contractAddress) {
      const tokenData = await GqlTokenInfo({ tokenIds: [tokenId], contractAddress: contractAddressLC })
      return tokenData.tokenInfo
    }
  }

  const key = `token-info-data-${getNftTokenKey({ tokenId, contract: contractAddress })},`

  return useAsyncState(key, async () => {
    try {
      const result = await fetchTokenInfo()
      return result && result[0] ? result[0] : null;
    } catch (error) {
      console.log("Error fetching", error)
      return null
    }
  })
}
