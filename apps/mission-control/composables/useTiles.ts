import { NftFragment, StakedNftFragment } from '#gql';
import { DronePlaycanvasMap } from './NFTs/useDrones';
import { Corporation } from './corporations/useCorporations';

export type TileCoord = 1 | 0 | -1 | 2 | -2 | 3 | -3

export interface Tile {
  q: TileCoord,
  r: TileCoord,
  s: TileCoord
}
export interface TileXYZ {
  x: TileCoord,
  y: TileCoord,
  z: TileCoord
}


export type TileRing = 'A' | 'B' | 'C1' | 'C2' | 'C'

export const TileRingA: Tile[] = [
  { q: 1, r: -1, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
  { q: -1, r: 0, s: 1 },
  { q: 0, r: -1, s: 1 },
]

export const TileRingB: Tile[] = [
  { q: 2, r: -2, s: 0 },
  { q: 2, r: -1, s: -1 },
  { q: 2, r: 0, s: -2 },
  { q: 1, r: 1, s: -2 },
  { q: 0, r: 2, s: -2 },
  { q: -1, r: 2, s: -1 },
  { q: -2, r: 2, s: 0 },
  { q: -2, r: 1, s: 1 },
  { q: -2, r: 0, s: 2 },
  { q: -1, r: -1, s: 2 },
  { q: 0, r: -2, s: 2 },
  { q: 1, r: -2, s: 1 },
]

// CHRONOS COORDINATES
export const TileRingC1: Tile[] = [
  { q: 3, r: -2, s: -1 },
  { q: 3, r: -1, s: -2 },
  { q: 2, r: 1, s: -3 },
  { q: 1, r: 2, s: -3 },
  { q: -1, r: 3, s: -2 },
  { q: -2, r: 3, s: -1 },
  { q: -3, r: 2, s: 1 },
  { q: -3, r: 1, s: 2 },
  { q: -2, r: -1, s: 3 },
  { q: -1, r: -2, s: 3 },
  { q: 1, r: -3, s: 2 },
  { q: 2, r: -3, s: 1 },
]

// HELIOS COORDINATES
export const TileRingC2: Tile[] = [
  { q: 3, r: -3, s: 0 },
  { q: 3, r: 0, s: -3 },
  { q: 0, r: 3, s: -3 },
  { q: -3, r: 3, s: 0 },
  { q: -3, r: 0, s: 3 },
  { q: 0, r: -3, s: 3 },
]

export const TileRingC: Tile[] = [

  { q: 3, r: -3, s: 0 }, // 1
  { q: 3, r: -2, s: -1 },
  { q: 3, r: -1, s: -2 },
  { q: 3, r: 0, s: -3 }, // 4
  { q: 2, r: 1, s: -3 },
  { q: 1, r: 2, s: -3 },
  { q: 0, r: 3, s: -3 }, // 7
  { q: -1, r: 3, s: -2 },
  { q: -2, r: 3, s: -1 },
  { q: -3, r: 3, s: 0 }, // 10
  { q: -3, r: 2, s: 1 },
  { q: -3, r: 1, s: 2 },
  { q: -3, r: 0, s: 3 }, // 13
  { q: -2, r: -1, s: 3 },
  { q: -1, r: -2, s: 3 },
  { q: 0, r: -3, s: 3 }, // 16
  { q: 1, r: -3, s: 2 },
  { q: 2, r: -3, s: 1 },
]


export const TileRings: Record<TileRing, Tile[]> = {
  A: TileRingA,
  B: TileRingB,
  C1: TileRingC1,
  C2: TileRingC2,
  C: TileRingC
}

const tilesAreEqual = (tile: Tile, tile2: Tile) =>
  tile.q == tile2.q && tile.r == tile2.r && tile.s == tile2.s

export type TileResourceType = 'waste' | 'energy'

export interface TileAsset extends NftFragment {
  timeLeft?: number
  index: number
  resourceAmount: number
  progress: number
  finishTime: string
  cap: number
}

export interface TileGroup extends StakedNftFragment {
  tile: Tile,
  tileName: string,
  ring: TileRing,
  land?: NftFragment,
  resources?: NftFragment[],
  assets?: TileAsset[]
  rentalToken: string
}

export interface CorporationTile {
  tile: Tile,
  corporation: Corporation
}

export const tileToId = (tile: Tile) => 'tile-' + Object.values(tile).join('-')

export const useTileSelection = () => {
  const selectedTile = useState<Tile | null>('tile-selected', () => null)
  const selectedTileGroup = useState<TileGroup | null>('tilegroup-selected', () => null)
  const selectedCorporation = useState<CorporationTile | null>('tile-selected-corporation', () => null)

  const isTileSelected = (tile: Tile) =>
    selectedTile.value && tilesAreEqual(selectedTile.value, tile)

  const selectedTileId = computed(() => selectedTile.value ? tileToId(selectedTile.value) : null)

  return {
    selectedTile,
    selectedTileGroup,
    selectedCorporation,
    selectedTileId,
    tilesAreEqual,
    tileToId,
    isTileSelected
  }
}

export const useTiles = () => {
  const { setWaste, setPix, setFacility, setDrone, setRover, clearAssets, setTaskProgress, gameInterface } = useGameInterface()
  const { getResourceTask } = useTasks()

  const { tileGroups } = useTileData()

  const setupTileListeners = () => {
    watch(tileGroups, () => {
      updateTiles()
    }, { immediate: true, deep: true })

    watch(gameInterface, (game) => {
      if (game)
        updateTiles()
    }, { immediate: true })

    throttledWatch(resourceTasks, () => {
      setResourceTasks()
    }, { throttle: 1500 })

  }

  const resourceTasks = computed(() =>
    tileGroups.value?.map((tileGroup) => {
      if (tileGroup?.assets && tileGroup.assets.length > 0) {
        return getResourceTask(tileGroup);
      }
      return null;
    }).filter(task => !!task).flat() ?? []
  )

  const getProgressType = (type: string) => {
    switch (type) {
      case 'drone': return 0
      case 'rover': return 1
      case 'facility': return 2
    }
  }

  const setResourceTasks = () => {
    resourceTasks.value.forEach((task) => {
      setTaskProgress(task.tile, task.progress, getProgressType(task.tokenInfo.type))
    })
  }

  const isRented = (group: TileGroup) =>
    group?.ring == 'A' ? true : group?.isRented

  const findTileGroup = (tile: Tile) =>
    tileGroups.value?.find((tileGroup) => tileGroup && tilesAreEqual(tileGroup.tile, tile))

  const isLandStakedOnTiles = (id: number | string) =>
    Object.values(tileGroups.value ?? []).find((group) =>
      group && (group.land?.tokenId == id || group.land?.tokenInfo.title == id)
    ) != null

  const wasteAtTile = (tile: Tile) => {
    const resource = findTileGroup(tile)?.resources
    if (resource?.some(item => item?.tokenInfo.type == 'waste'))
      return resource[0].balance

    return 0
  }

  const wasteAtTileGroup = (tileGroup: TileGroup): number =>
    wasteAtTile(tileGroup.tile)

  const setTile = (tileGroup?: TileGroup) => {
    if (!tileGroup)
      return

    const { tile } = tileGroup

    setPix(tileGroup)
    clearAssets(tile)
    if (tileGroup.assets.some(item => item.tokenInfo.type == 'facility')) {
      const tokenId = tileGroup.assets.find(item => item.tokenInfo.type == 'facility').tokenId
      setFacility(tile, FacilityLevelMap[tokenId])
    }

    if (tileGroup.assets.some(item => item.tokenInfo.type == 'drone')) {
      const level = DronePlaycanvasMap[Number(tileGroup.assets.find(item => item.tokenInfo.type == 'drone').tokenId)]

      setDrone(tile, level ?? 1)
    }

    if (tileGroup.assets.some(item => item?.tokenInfo.type == 'rover')) {
      const tier = RoverPlaycanvasTierMap[tileGroup.assets.find(item => item.tokenInfo.type == 'rover').tokenInfo.tier]

      const status = RoverPlaycanvasStatusMap[tileGroup.assets.find(item => item.tokenInfo.type == 'rover').tokenInfo.status]

      setRover(tile, tier, status)
    } else if (tileGroup.assets.some(item => !item)) {
      clearAssets(tile)
    }

    setWaste(tileGroup.tile, tileGroup.assets.length > 0 ? 0 : wasteAtTileGroup(tileGroup))
  }


  const updateTiles = () => {
    if (!gameInterface.value)
      return

    tileGroups.value?.forEach((tileGroup) => {
      setTile(tileGroup)
    })

    setResourceTasks()
  }

  const getTileRing = (tile: Tile): TileRing =>
    Object.keys(TileRings).find((ring) =>
      !!TileRings[ring].find((ringTile) => tilesAreEqual(tile, ringTile))
    ) as TileRing


  const activeTileRents = computed(() => getActiveRentCount(tileGroups.value))
  const rentsInCurrency = () => tileGroups.value.filter((group) => group?.rentalToken)

  const getActiveRentCount = (groups: TileGroup[]) =>
    groups.filter((group) => group?.isRented).length

  const tileGroupsInRing = (ring: TileRing) =>
    tileGroups.value.filter(group => group?.ring == ring)

  const tilesAreEqual = (tile: Tile, tile2: Tile) =>
    tile.q == tile2.q && tile.r == tile2.r && tile.s == tile2.s

  const getTileName = (findTile: Tile): string => {
    const ring = getTileRing(findTile)

    let tiles = TileRings[ring]

    if (ring == 'C1' || ring == 'C2')
      tiles = TileRings['C']

    let index = tiles.findIndex((tile) =>
      tilesAreEqual(tile, findTile))

    if (ring == 'C1' || ring == 'C2')
      return `${ring.substring(0, ring.length - 1)}${index + 1}`
    return `${ring}${index + 1}`
  }


  return {
    resourceTasks,
    activeTileRents,
    getActiveRentCount,
    rentsInCurrency,
    isRented,
    tileGroupsInRing,
    tileToId,
    getTileRing,
    updateTiles,
    findTileGroup,
    wasteAtTile,
    wasteAtTileGroup,
    isLandStakedOnTiles,
    setupTileListeners,
    getTileName
  }
}