

import { NftFragment } from '#gql';
import { TileGroup, Tile, TileCoord } from '~~/composables/useTiles';

const fetchTiles = async (tiles: Tile[]): Promise<TileGroup[]> => {

  const credentials = useGraphqlCredentials()

  const stakedOnTile = await GqlStakedOnTile({ credentials, tiles })

  const tileGroups = stakedOnTile.stakedOnTile.map((stakedItem, index) => {
    const { base, top } = stakedItem
    const tileQRS = stakedItem.tiles
    const tile = { q: tileQRS.q as TileCoord, r: tileQRS.r as TileCoord, s: tileQRS.s as TileCoord }
    const baseResource: NftFragment[] = base ? [base?.resource] : []

    const topResources: NftFragment[] = top ? top.map(item => item?.resource) : []
    const allResources: NftFragment[] = (baseResource.concat(topResources)).filter(item => item)
    const assets = top ? top.filter(item => item).map(item => ({ ...item.token, timeLeft: item.timeLeft, index: item.index, cap: item.cap, resourceAmount: item.resourceAmount, progress: item.progress, finishTime: item.finishTime })) : [];

    const tileGroup = {
      ...stakedItem,
      tile,
      assets: assets,
      resources: allResources,
      land: base?.land
    } as TileGroup

    return tileGroup
  })

  return tileGroups
}

const TILE_KEY = 'tile-data'

export const useTileData = () => {
  const { tilesAreEqual } = useTileSelection()
  const allTiles = Object.values(TileRings).flat()
  const pending = useState('tiles-pending', () => false)
  const getTileKey = (tile: Tile) => `${TILE_KEY}-${tileToId(tile)}`

  const data = Object.fromEntries(
    allTiles.map(tile => [
      tileToId(tile),
      useState<TileGroup>(getTileKey(tile), () => null)
    ])
  )

  const tileGroups = computed(() =>
    Object.values(data).map((tile) => tile.value)
  )

  const fetchNewData = async (tiles: Tile[]) => {
    pending.value = true
    try {

      const tileData = await fetchTiles(tiles)

      tileData.forEach((tileGroup) => {
        const tileId = tileToId(tileGroup.tile)
        data[tileId].value = tileGroup
      })

    } catch (error) {
      console.log("Tile fetch failed", error)
    }
    pending.value = false
  }

  const execute = async () => {
    if (pending.value || tileGroups.value.some(data => !!data))
      return

    await fetchNewData(allTiles)
    return
  }

  const refreshTiles = async (tiles: Tile[]) => {
    const itemsToRefresh = tileGroups.value.filter((tileData) =>
      tileData && !!tiles.find((tile) => tilesAreEqual(tileData.tile, tile))
    )

    if (itemsToRefresh) {
      return await fetchNewData(itemsToRefresh.map((tileData) => tileData.tile))
    }
    else return
  }

  const refreshAllTiles = () => {
    return refreshTiles(allTiles)
  }

  return {
    tileGroups,
    execute,
    refreshTiles,
    refreshAllTiles
  }
}
