
export type GenesisCorporation = 'lucky-cat' | 'new-lands' | 'y-space' | 'gws' | 'eternalab' | 'net-empire' | 'gravity-grade'


export const GenesisCorporationMap: Record<number, GenesisCorporation> = {
  1: 'lucky-cat',
  2: 'y-space',
  3: 'new-lands',
  4: 'gws',
  5: 'eternalab',
  6: 'net-empire',
  7: 'gravity-grade'


}
export const CorporationGenesisMap = (() => {
  let list = {}
  Object.keys(GenesisCorporationMap).forEach((key) => {
    const value = GenesisCorporationMap[key]
    list[value] = key
  })
  return list as Record<GenesisCorporation, number>
})()


