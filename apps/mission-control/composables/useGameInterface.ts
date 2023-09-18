import type { GameMenuId } from '~~/composables/types'
import { LandTypeMap, type LandType, LandTypes, } from "./NFTs/useLand"
import type { Tile, TileGroup } from "./useTiles"
import { useLocalStorage } from '~~/composables/useLocalStorage';
import { TokenInfoFragment } from '#gql';

type CameraOffsetType = 'default' | 'offsetLeft' | 'offsetBottom'

export enum PixState {
  InActive = 0,
  Active = 1,
  PendingActive = 2,
  PendingInActive = 3,
  NoContract = 4,
  NotStaked = 5
}

export const useGameInterface = () => {
  const config = useRuntimeConfig().public
  const gameInterface = useState<any | null>('gameInterface', () => { null })
  const forcePauseRender = useState('game-force-pause', () => config.disablePlaycanvas)
  const buildMode = useBuildToolMode()
  const gameQuality = useState('game-quality', () => 2)
  const activePopup = usePopups()
  const { activePopup: activeTokenPopup } = usePopupToken()
  const isMobile = useState('game-on-mobile', () => false)
  const isOnMissionControlPath = useState('game-visible', () => false)
  const activeGameMode = useState<GameMenuId>('active-mode', () => null)
  const { proposedNFTStake } = useProposedNFTStakes()
  const { selectedTile } = useTileSelection()
  const { transactionState } = useTransactions()
  const { tokenInfoForRing } = useTileRings()
  const documentVisibility = useDocumentVisibility()
  const { selectedContract } = useTileContract()

  const gameMenu = useGameMenu()

  const setupPlaycanvasListeners = () => {


    watch(selectedTile, (tile) => {
      if (tile) {
        selectTile(tile)
      }
    })

    watch(gameMenu, activateGameMode)

    watch(gameQuality, (newQuality) => {
      const currentState = gameInterface.value?.getGraphicState()

      if (newQuality == currentState)
        return

      gameInterface.value?.setGraphicState(newQuality)

    }, { immediate: true })

    watch(selectedContract, (contract) => {
      if (contract == null)
        gameInterface.value?.activateInspectMode()

    }, { immediate: true })

    watch(proposedNFTStake, (proposedStake) => {
      if (!proposedStake || !proposedStake.nft)
        return activateGameMode(null)

      const { nft: { tokenInfo } } = proposedStake

      if (LandTypes.includes(tokenInfo.type as LandType))
        return enableLandBuildMode(tokenInfo.tier, tokenInfo.type)
      else if (tokenInfo.type == "drone")
        return enableDroneBuildMode()
      else if (tokenInfo.type == "rover")
        return enableRoverBuildMode()
      else if (tokenInfo.type == 'facility')
        return enableFacilityBuildMode(tokenInfo)
      else
        activateGameMode(null)
    })

    watch(isRenderedPaused, (renderPaused) => {
      toggleRendering(renderPaused)
    }, { immediate: true })

    setMouseInCanvas(false)
  }

  const isRenderedPaused = computed(() => {
    return forcePauseRender.value ||
      !!activePopup.value ||
      !!activeTokenPopup.value ||
      !isOnMissionControlPath.value ||
      documentVisibility.value != 'visible' ||
      transactionState.value != null
  })

  interface TileState {
    pixType: string,
    landType: string,
    pixState: PixState
  }

  const getBaseTileState = (tileGroup: TileGroup): TileState => {
    const pixState = getPixState(tileGroup)
    const pixType: string = tileGroup.land?.tokenInfo.tier ?? 'empty'
    const landType: string = tileGroup.land?.tokenInfo.type ?? 'none'
    return { pixType, landType, pixState }
  }

  const getTileState = (tileGroup: TileGroup) => {
    return tileGroup.ring == 'A' ?
      getBaseTileState(tileGroup) :
      getRentedPixState(tileGroup)
  }

  const getPixAndLandTypeFromState = (tileState: TileState) => {
    const pixType = PixTypes[tileState.pixType]
    const landType = LandTypeMap[tileState.landType]

    return { pixType, landType }
  }

  const getPixState = (tileGroup: TileGroup): PixState => {
    const needsRent = tileGroup.ring != 'A'
    const { staked, owned } = tokenInfoForRing(tileGroup.ring)

    if (!owned && !staked)
      return PixState.NoContract

    if (!staked)
      return PixState.NotStaked

    if (needsRent && !tileGroup.isRented)
      return PixState.InActive

    return PixState.Active

  }

  const getRentedPixState = (tileGroup: TileGroup): TileState => {
    const { staked, owned } = tokenInfoForRing(tileGroup.ring)
    const hasToken = staked || owned

    const pixState = getPixState(tileGroup)
    const { land } = tileGroup

    let pixType: string = hasToken ? 'empty' : 'empty'
    pixType = land?.tokenInfo.tier ? land.tokenInfo.tier : pixType
    const landType: string = land?.tokenInfo.type ?? 'none'

    return {
      pixType,
      landType,
      pixState
    }
  }

  const setPixPendingActive = (tileGroup: TileGroup, isDirty: boolean) => {
    const { tile } = tileGroup
    const tileState = getTileState(tileGroup)
    const { pixType, landType } = getPixAndLandTypeFromState(tileState)

    const originalState = tileState.pixState

    const getNewState = () => {
      if (!isDirty)
        return originalState

      return originalState == PixState.Active ?
        PixState.PendingInActive : PixState.PendingActive
    }
    const newState = getNewState()

    gameInterface.value?.setPix(...tileArgs(tile), pixType, landType, newState)
  }

  const setPix = (tileGroup: TileGroup) => {
    const { tile } = tileGroup
    const tileState = getTileState(tileGroup)

    const { pixType, landType } = getPixAndLandTypeFromState(tileState)

    gameInterface.value?.setPix(...tileArgs(tile), pixType, landType, tileState.pixState)
  }

  const setRings = (rings: number) => {
    console.log("Set rings", rings)
    const { savedData } = useLocalStorage('gameQuality', 2)
    const graphicState = savedData.value !== null ? savedData.value : 2
    setGraphicState(graphicState)
    gameInterface.value?.setRings(rings)
  }

  const getGraphicState = () => {
    return gameInterface.value?.getGraphicState()
  }

  const setGraphicState = (graphicsQuality: number) => {
    gameQuality.value = graphicsQuality
  }

  const removePix = (tile: Tile) => {
    gameInterface.value?.removePix(...tileArgs(tile))
  }

  const hoverTile = (tile: Tile, active: boolean = true) => {
    gameInterface.value?.hoverPix(...tileArgs(tile))
  }

  const selectTile = (tile: Tile, active: boolean = true) => {
    gameInterface.value?.selectPix(...tileArgs(tile))
    //setGraphicState(Math.floor(Math.random() * 2))
  }

  const resetSelect = () => {
    gameInterface.value?.resetSelect()
  }

  const resetHover = () => {
    gameInterface.value?.resetHover()
  }

  const setMobile = (onMobile: boolean) => isMobile.value = onMobile

  const setCameraOffset = (type: 'default' | 'slideout') => {
    const offsets: Record<CameraOffsetType, number[]> = {
      default: [0.5, 0.5],
      offsetLeft: [0.6, 0.5],
      offsetBottom: [0.5, 0.3],
    }

    const offsetType: CameraOffsetType = (() => {
      if (type == 'slideout')
        return isMobile.value ? 'offsetBottom' : 'offsetLeft'
      else
        return 'default'
    })()

    const offset = offsets[offsetType]
    gameInterface.value?.setCameraScreenSpaceOrigo(...offset)
  }

  const setEnergy = (tile: Tile, quantity: number) => {
    gameInterface.value?.setEnergyOnPix(...tileArgs(tile), quantity)
  }

  const setWaste = (tile: Tile, quantity: number, animate: boolean = false) => {
    if (animate)
      gameInterface.value?.pickWaste(...tileArgs(tile))

    gameInterface.value?.setWasteOnPix(...tileArgs(tile), quantity)
  }

  // const pickWaste = (tile: Tile) => {
  //   gameInterface.value?.pickWaste(x, y, z)
  // }

  const clearResources = (tile: Tile) => {
    if (!gameInterface.value)
      return

    setWaste(tile, 0)
  }

  const clearAssets = (tile: Tile) => {
    gameInterface.value?.removeAsset(...tileArgs(tile))
  }

  const tileArgs = (tile: Tile) => Object.values(tile)

  const setFacility = (tile: Tile, level: number) => {
    gameInterface.value?.setFacility(...tileArgs(tile), level)
  }

  const setDrone = (tile: Tile, level: number) => {
    gameInterface.value?.setDrone(...tileArgs(tile), level)
  }

  const setRover = (tile: Tile, level: number, status: number) => {
    gameInterface.value?.setRover(...tileArgs(tile), level, status)
  }

  const setTaskProgress = (tile: Tile, progress: number, type: number) => {
    gameInterface.value?.setProgress(...tileArgs(tile), progress, type)
  }

  const setMouseInCanvas = (isActive: boolean) => {
    if (!gameInterface.value)
      return

    gameInterface.value.setIsCursorInCanvas = isActive
  }

  const activateGameMode = (mode: GameMenuId) => {
    if (!gameInterface.value)
      return

    const sidebarModes: GameMenuId[] = ['build', 'task-manager', 'overview']

    activeGameMode.value = mode

    if (sidebarModes.includes(mode))
      setCameraOffset('slideout')
    else
      setCameraOffset('default')

    switch (mode) {
      case 'build':
        return activateBuildMode()

      case 'waste-collect':
        return gameInterface.value?.activatePixelPushMode()

      case 'task-manager':
        return gameInterface.value?.activateTaskmanagerMode()

      case 'overview':
        return gameInterface.value?.activateOverviewMode()

    }

    if (mode == null)
      resetMode()
  }

  const activateBuildMode = (tile?: Tile[]) => {
    if (buildMode.value == 'build')
      return null; //gameInterface.value?.activateBuildModeAny()
    // else if (selectedContract.value != null) {
    //   const { ring } = selectedContract.value
    //   return gameInterface.value?.activateContractMode(TileRings[ring])
    // }
  }

  const activateContractMode = () => {
    if (selectedContract.value != null) {
      const { ring } = selectedContract.value
      return gameInterface.value?.activateContractMode(TileRings[ring])
    }
  }

  const resetMode = () => {
    if (selectedTile.value) {
      selectedTile.value = null
      resetSelect()
    }

    return gameInterface.value?.activateInspectMode()
  }

  const toggleRendering = (isPaused: boolean) => {
    if (!gameInterface.value)
      return

    gameInterface.value?.setIsRenderActive(!isPaused)
  }


  const enableDroneBuildMode = () => {
    gameInterface.value?.activateDronePlacingMode(0)
  }

  const enableRoverBuildMode = () => {
    gameInterface.value?.activateRoverPlacingMode(0)
  }


  const enableLandBuildMode = (tier: string, type: string) => {
    gameInterface.value?.activateBuildMode(tier, type);
  }

  const enableFacilityBuildMode = (item: TokenInfoFragment) => {
    console.log("enable facility building mode", item.tier, 1)
    gameInterface.value?.activateFacilityPlacingMode(item.tier, 1)
    console.log("enable facility building mode", item.tier, 1)
  }


  return {
    resetMode,
    isOnMissionControlPath,
    isRenderedPaused,
    activateGameMode,
    setupPlaycanvasListeners,
    enableDroneBuildMode,
    enableLandBuildMode,
    setPix,
    removePix,
    setMobile,
    setDrone,
    setRover,
    setFacility,
    setEnergy,
    setWaste,
    selectTile,
    hoverTile,
    resetHover,
    resetSelect,
    clearResources,
    clearAssets,
    setMouseInCanvas,
    setRings,
    setTaskProgress,
    setCameraOffset,
    getPixState,
    gameInterface,
    activeGameMode,
    getRentedPixState,
    setPixPendingActive,
    setGraphicState,
    getGraphicState,
    gameQuality,
    activateContractMode
  }
}