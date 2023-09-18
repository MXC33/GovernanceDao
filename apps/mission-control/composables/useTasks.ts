
import type { Tile, TileAsset, TileGroup, TileResourceType, TileRing } from './useTiles'

export interface Task extends TileAsset {
  name: string
  resourceType: TileResourceType
  tile: Tile,
  position: number,
}

export interface ResourceTask extends Task { }

export interface OrderMeta {
  name: string,
  value: string
}

export interface OrderTask extends Task {
  meta?: OrderMeta[],
  status?: string
}

export const useTasks = () => {

  const getResourceTask = (tileGroup: TileGroup): ResourceTask[] => {
    const { assets, tile } = tileGroup
    const resourceTasks: ResourceTask[] = assets.map((item, index) => {
      const isDrone = item.tokenInfo.type == 'drone' || item.tokenInfo.type == 'rover'
      const resourceType: TileResourceType = isDrone ? 'waste' : 'energy'

      return {
        name: `${item.tokenInfo.tier} ${item.tokenInfo.type}`,
        resourceType,
        finishTime: Number(item.finishTime),
        tile,
        ...item,
        progress: item.progress,
        position: item.index
      }
    })
    return resourceTasks

  }
  return {
    getResourceTask
  }
}