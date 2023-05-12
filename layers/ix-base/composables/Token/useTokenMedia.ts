import { TokenType } from "./tokenMaps"
import { TokenIdentifier } from "./useTokens"

const imageTokens = ['pix', 'anniversary-pack', 'loot-crate', 'starter-pack', 'coinbase', 'gg', 'arcade', 'tile-contract', 'cargo-drop', 'avatar', 'aoc-badge'] as TokenType[]

export const useTokenMedia = () => {
  const tokenHasVideo = (token: TokenIdentifier) =>
    !imageTokens.includes(token.type)


  return {
    tokenHasVideo,
    imageTokens
  }
}