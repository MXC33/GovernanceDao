import { IXToken } from './useIXToken'
import { NftFragment } from '#gql'

export type AnyToken = IXToken | NftFragment

export const isIXToken = (token: AnyToken): token is IXToken => (token as IXToken)?.token_id != null

export const getTokenKey = (token: AnyToken) => {
  if (isIXToken(token)) {
    return token.token_id + token.collection
  }
  return token.tokenId ?? "" + token.contract
}
