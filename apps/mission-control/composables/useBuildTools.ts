import type { Tile, TileRing } from './useTiles';
import { TileGroup } from './useTiles';
import { kebabCaseIt } from 'case-it';
import type { Corporation } from './corporations/useCorporations'
import { NftFragment } from '#gql';

export type BuildType = 'land' | 'tech' | 'facility'
export type BuildMode = 'build' | 'contracts'
export type OverviewMode = 'tiles' | 'perks'


export const useBuildToolMode = () => useState<BuildMode>('build-mode', () => 'build')
export const useOverviewToolMode = () => useState<OverviewMode>('overview-mode', () => 'tiles')

export const useOverview = () => {
  const tabs = ["district-a", "district-b", "district-c"] as const
  const activeTab = useState<typeof tabs[number]>('overview-tabs', () => tabs[0])

  return {
    tabs,
    activeTab,
  }
}

export const useBuildTools = () => {
  const { proposeStakeNFT, proposedNFTStake } = useStakeNFTFlow()
  const { clearStaking, } = useStakeNFTContracts()
  const { selectedContract } = useTileContract()
  const { pickWaste, canPickFromTile } = useWaste()
  const { activateGameMode, getPixState } = useGameInterface()
  const { selectedTile, selectedCorporation } = useTileSelection()
  const buildMode = useBuildToolMode()
  const overviewMode = useOverviewToolMode()
  const { findTileGroup } = useTiles()
  const { activeTab: activeYSpaceTab } = useYSpaceTaskManager()
  const { activeTab: activeOverviewTab } = useOverview()
  const gameMenu = useGameMenu()
  const activeTaskManagerMenu = useTaskManagerActiveCorporation()

  const buildSelectionGroup = useState<NftFragment | null>('build-selection', () => null)
  const buildType = useState<BuildType>('build-type', () => 'land')
  const selectedBuildItem = useState<NftFragment | null>('build-active-item', () => null)
  const overviewType = useState<TileRing>('overview-type', () => 'A')


  const setupListeners = () => {
    watch(buildMode, (mode) => {
      if (mode) {
        activateGameMode('build')
        activeTaskManagerMenu.value = null
      } else {
        activateGameMode(null)
      }
    })
    watch(buildType, () => {
      selectedBuildItem.value = null
      activateGameMode('build')
    })

    watch(buildSelectionGroup, (selectionGroup) => {
      if (selectionGroup == null) {
        cancelSelectingPix()
      }
    })

    watch(overviewMode, (mode) => {
      if (mode)
        activateGameMode('overview')
      else
        activateGameMode(null)
    })
  }

  const cancelBuilding = () => {
    buildType.value = 'land'
    buildSelectionGroup.value = null

    gameMenu.value = null
    buildMode.value = null
    selectedContract.value = null
    cancelSelectingPix()
  }

  const cancelSelectingPix = () => {
    // activateGameMode('build')
    clearStaking()
  }

  const selectGroup = (token: NftFragment) => {
    buildSelectionGroup.value = token
  }

  const onClickOutsideTile = () => {
    selectedTile.value = null
  }

  const activateBuildMenu = () => {
    buildMode.value = 'build'
    gameMenu.value = 'build'
  }

  const activateContractsMenu = () => {
    buildMode.value = 'contracts'
    gameMenu.value = 'build'
  }

  const activateOverviewMenu = () => {
    overviewMode.value = 'tiles'
    gameMenu.value = 'overview'
  }

  const clickOpenTaskManager = (tileGroup: TileGroup) => {
    gameMenu.value = 'task-manager'
    const isNewlands = tileGroup.assets?.some(item => item.tokenInfo.type == 'facility')

    if (isNewlands)
      activeTaskManagerMenu.value = 'new-lands'
    else {
      const isRover = getUniqueAssetTypeOnTile(tileGroup) == 'rover'

      activeTaskManagerMenu.value = 'y-space'
      activeYSpaceTab.value = isRover ? 'rovers' : 'drones'
    }
  }

  const getUniqueAssetTypeOnTile = (tileGroup: TileGroup) => {
    if (!tileGroup || tileGroup.assets?.length != 1)
      return false

    return tileGroup.assets[0].tokenInfo.type
  }

  const clickInTaskManager = (tileGroup: TileGroup) => {
    if (!tileGroup || tileGroup.assets?.length == 0)
      return

    const assetType = getUniqueAssetTypeOnTile(tileGroup)
    if (!assetType)
      return

    if (assetType == 'rover') {
      activeYSpaceTab.value = 'rovers'
      return activeTaskManagerMenu.value = 'y-space'
    }

    if (assetType == 'drone') {
      activeYSpaceTab.value = 'drones'
      return activeTaskManagerMenu.value = 'y-space'
    }

    if (assetType == 'facility') {
      return activeTaskManagerMenu.value = 'new-lands'
    }
  }

  const clickInOverviewMode = (tileGroup: TileGroup) => {
    if (!tileGroup || tileGroup.assets?.length == 0)
      return

    const assetType = getUniqueAssetTypeOnTile(tileGroup)
    if (!assetType)
      return
    if (tileGroup.ring == 'A') {
      return activeOverviewTab.value = 'district-a'
    }

    if (tileGroup.ring == 'B') {
      return activeOverviewTab.value = 'district-b'
    }

    if (tileGroup.ring == 'C1' || tileGroup.ring == 'C2') {
      return activeOverviewTab.value = 'district-c'
    }

  }

  const clickInDefaultMode = (tileGroup: TileGroup) => {
    console.log(tileGroup)
    if (!tileGroup || !tileGroup.land) {
      return activateBuildMenu()
    }

    if (tileGroup.assets.length > 0)
      return clickOpenTaskManager(tileGroup)

    if (tileGroup.resources?.some(item => item.tokenInfo.type == 'waste') && canPickFromTile(tileGroup.tile))
      return activatePickWasteMode(tileGroup)

    return activateBuildMenu()
  }

  const activatePickWasteMode = (tileGroup: TileGroup) => {
    pickWaste(tileGroup.tile)
    gameMenu.value = 'waste-collect'
  }

  const clickStake = (tile: Tile) => {
    if (!proposedNFTStake.value)
      return

    proposeStakeNFT(tile)
  }

  const maybeSelectCorporation = (corporation: Corporation, tile: Tile) => {
    const gameMenu = useGameMenu()

    if (gameMenu.value && gameMenu.value != 'corporation-splash')
      return

    selectedTile.value = tile
    selectedCorporation.value = {
      corporation,
      tile
    }

    gameMenu.value = 'corporation-splash'
  }

  const onClickTile = (tile: Tile, type?: string) => {
    if (!tile)
      return onClickOutsideTile()

    const maybeCorporation = kebabCaseIt(type) as Corporation
    if (Corporations.includes(maybeCorporation))
      return maybeSelectCorporation(maybeCorporation, tile)

    const tileGroup = findTileGroup(tile)
    if (!tileGroup)
      return

    const state = getPixState(tileGroup)
    switch (state) {
      case PixState.NoContract:
        return navigateTo('/new-lands/shop')
      case PixState.NotStaked:
        return navigateTo('/new-lands/stake-burn/stake-contract')

      case PixState.InActive:
        return activateContractsMenu()
    }

    selectedTile.value = tile

    switch (gameMenu.value) {
      case 'waste-collect':
        return pickWaste(tileGroup.tile)

      case 'build':
        return clickStake(tile)

      case 'overview':
        return clickInOverviewMode(tileGroup)

      case 'task-manager':
        return clickInTaskManager(tileGroup)

      default:
        return clickInDefaultMode(tileGroup)

    }
  }


  return {
    onClickTile,
    setupListeners,
    cancelBuilding,
    selectGroup,
    activateBuildMenu,
    activateOverviewMenu,
    buildSelectionGroup,
    buildType,
    buildMode,
    selectedBuildItem,
    overviewMode,
    overviewType
  }
}