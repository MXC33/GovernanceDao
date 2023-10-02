import type { Tile } from "./useTiles";

export interface ProposedWastePick {
  tile: Tile,
  wastePicked: number,
  wasteLeft: number
}
export const useWaste = () => {
  const { setWaste } = useGameInterface()
  const { wasteAtTile } = useTiles()
  const { tilesAreEqual } = useTileSelection()

  const pickedWaste = useState<ProposedWastePick[]>('waste-picked', () => [])

  const currentWasteLeft = computed(() =>
    pickedWaste.value
      .map((item) => item.wasteLeft)
      .reduce((a, b) => a + b, 0)
  )

  const currentPickedWaste = computed(() =>
    pickedWaste.value
      .map((item) => item.wastePicked)
      .reduce((a, b) => a + b, 0)
  )

  const findPickIndex = (tile: Tile) => {
    return pickedWaste.value.findIndex((item) =>
      tilesAreEqual(item.tile, tile)
    )
  }

  const discardPickedWaste = () => {

    pickedWaste.value.forEach((item) => {
      const originalWaste = wasteAtTile(item.tile)
      setWaste(item.tile, originalWaste)
    })
    pickedWaste.value = []
  }

  const wasteOnTile = (tile: Tile, pickAmount: number = 0): ProposedWastePick => {
    const index = findPickIndex(tile)

    const currentWaste = wasteAtTile(tile)
    const wastePicked = index == -1 ?
      pickAmount :
      pickedWaste.value[index].wastePicked + pickAmount

    return {
      tile,
      wastePicked: Math.min(currentWaste, wastePicked),
      wasteLeft: Math.max(0, currentWaste - wastePicked)
    }
  }

  const canPickFromTile = (tile: Tile) => {
    const { wasteLeft } = wasteOnTile(tile)
    return wasteLeft > 0
  }

  const pickWaste = (tile: Tile) => {
    const index = findPickIndex(tile)
    const wasteModel = wasteOnTile(tile, 1)

    setWaste(tile, wasteModel.wasteLeft, true)

    if (index == -1)
      pickedWaste.value.push(wasteModel)
    else
      pickedWaste.value[index] = wasteModel
  }

  const getWasteToMint = () => {
    const tilesWithWaste = pickedWaste.value
      .filter((item) => item.wasteLeft == 0)

    const tiles = tilesWithWaste.map((item) => item.tile)
    const totalWaste = tilesWithWaste.map((item) => item.wastePicked).reduce((a, b) => a + b, 0)

    return {
      tiles,
      totalWaste
    }
  }

  return {
    getWasteToMint,
    pickWaste,
    discardPickedWaste,
    currentPickedWaste,
    currentWasteLeft,
    pickedWaste,
    canPickFromTile
  }
}

