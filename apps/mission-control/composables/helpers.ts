import { NftFragment } from "#gql";

export const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});


export const categorizeNFTs = <T extends NftFragment>(list: T[]) => {

  if (!list)
    return []

  interface CategorizedNFT {
    items: T[],
    name: string
  }

  const map: Record<string, CategorizedNFT> = {}
  list.forEach((nft) => {
    const { type: name } = nft.tokenInfo
    if (!map[name])
      return map[name] = { name, items: [nft] }
    else
      map[name].items.push(nft)
  })
  return Object.values(map)
}

export const usePlural = (n: number, currentString: string = "") => {
  const loweredString = currentString.toLowerCase()
  const skipPluralize = ['waste', 'energy']
  if (skipPluralize.includes(currentString))
    return ""

  const isLetterSTrailing = loweredString.slice(-1) == "s"
  return (n > 1 && !isLetterSTrailing) ? 's' : ''
}



export const useWait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
