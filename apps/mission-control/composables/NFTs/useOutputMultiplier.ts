import { NftFragment } from "#gql"
import { TileGroup, TileRing } from "../useTiles"
import { RingOutputs } from "./useFacility"
import { RoverTier } from "./useRovers"


const BaseWasteOutputMap: Partial<Record<TileRing, number>> = {
  A: 6,
  B: 12,
  C1: 15,
  C2: 18,
}

const DroneCollectionRateMap: Record<string, RingOutputs> = {
  // Per 24h (Sheet is per 48h)
  piercer: {
    A: 18,
    B: 22,
    C1: 22,
    C2: 23.5,
  },
  genesis: {
    A: 22,
    B: 27,
    C1: 27,
    C2: 29,
  },
  night: {
    A: 30,
    B: 36,
    C1: 36,
    C2: 39,
  }
}

const DroneIfStakedOnSameTierRoverCollectionRateMap: Record<string, RingOutputs> = {
  // Per 24h (Sheet is per 48h)
  piercer: {
    A: 22,
    B: 26.5,
    C1: 26.5,
    C2: 28.5,
  },
  genesis: {
    A: 26.5,
    B: 32.5,
    C1: 32.5,
    C2: 35,
  },
  night: {
    A: 36,
    B: 43.5,
    C1: 43.5,
    C2: 47,
  }
}

const RoverCollectionRateMap: Record<RoverTier, RingOutputs> = {
  // Per 24h (Sheet is per 48h)
  "rvr piercer": {
    A: 16,
    B: 19.2,
    C1: 19.2,
    C2: 20.8,
  },
  "rvr genesis": {
    A: 24,
    B: 28.8,
    C1: 28.8,
    C2: 31.2,
  },
  "rvr night": {
    A: 30,
    B: 36,
    C1: 36,
    C2: 39,
  }
}

export const useTileMetaData = () => {
  const energyProductionPerDay = (type: string, tier: string, ring: TileRing, level: number = 1) => {
    const TOTAL_HOURS = 24

    const amount = (TOTAL_HOURS / FacilityOutputCycle[tier][ring])
    const multiplier = LandTypeEnergyMap[type]

    return amount * multiplier * FacilityEnergyByLevelMultiplier[level]
  }

  const totalEnergyProductionPerDay = (tileGroup: TileGroup[]) => {
    const totalProd = tileGroup.map(group => {
      const facility = group?.assets?.find(item => item?.tokenInfo.type == 'facility')

      if (group?.land && facility) {
        const level = facility.tokenInfo?.level
        return energyProductionPerDay(group.base?.land.tokenInfo.type, group.base?.land.tokenInfo.tier, group.ring, level)
      }
      return 0
    })
    return totalProd.reduce((a, b) => a + b) ?? 0
  }

  const stripRvr = (tier: string): string => {
    if (tier.startsWith('rvr ')) {
      return tier.substring(4)
    }
    return tier
  }

  const roverAndDroneSameTier = (assets: NftFragment[]) => {
    const tiers = assets.map(item => stripRvr(item.tokenInfo.tier))
    return tiers[0] === tiers[1]
  }

  const wasteOutputDroneAndRover = (ring: TileRing, assets?: NftFragment[]) => {
    const sameTier = roverAndDroneSameTier(assets)
    if (sameTier)
      return DroneIfStakedOnSameTierRoverCollectionRateMap[assets.find(item => item.tokenInfo.type == 'drone').tokenInfo.tier][ring]

    return DroneCollectionRateMap[assets.find(item => item.tokenInfo.type == 'drone').tokenInfo.tier][ring]
  }

  const totalWasteOutputDroneAndRover = (ring: TileRing, assets?: NftFragment[]) => {
    const sameTier = roverAndDroneSameTier(assets)
    if (sameTier)
      return RoverCollectionRateMap[assets.find(item => item.tokenInfo.type == 'rover').tokenInfo.tier][ring] + DroneIfStakedOnSameTierRoverCollectionRateMap[assets.find(item => item.tokenInfo.type == 'drone').tokenInfo.tier][ring]

    return RoverCollectionRateMap[assets.find(item => item.tokenInfo.type == 'rover').tokenInfo.tier][ring] + DroneCollectionRateMap[assets.find(item => item.tokenInfo.type == 'drone').tokenInfo.tier][ring]
  }

  const wasteOutputPerDay = (ring: TileRing, assets?: NftFragment[], total?: boolean) => {

    if (assets?.length == 0 || !assets)
      return BaseWasteOutputMap[ring]

    const isRover = assets.some(item => item?.tokenInfo.type == 'rover')
    const isDrone = assets.some(item => item?.tokenInfo.type == 'drone')

    const hasTwoAssetStaked = assets.length == 2

    if (hasTwoAssetStaked && total)
      return totalWasteOutputDroneAndRover(ring, assets)
    if (hasTwoAssetStaked)
      return wasteOutputDroneAndRover(ring, assets)
    if (isRover)
      return RoverCollectionRateMap[assets.find(item => item.tokenInfo.type == 'rover').tokenInfo.tier][ring]
    if (isDrone)
      return DroneCollectionRateMap[assets.find(item => item.tokenInfo.type == 'drone').tokenInfo.tier][ring]

  }

  const activePerkPercentage = (group: TileGroup): number | null => {
    if (group.ring == 'A')
      return null

    const baseWasteOutput = wasteOutputPerDay('A')

    if (group.assets.length == 0)
      return (wasteOutputPerDay(group.ring) / baseWasteOutput) - 1

    if (group.assets.find(item => item.tokenInfo.type == 'drone')) {
      const wasteMap = DroneCollectionRateMap[group.assets.find(item => item.tokenInfo.type == 'drone').tokenInfo.tier]
      return (wasteMap[group.ring] / wasteMap['A']) - 1
    }

    if (group.assets.find(item => item.tokenInfo.type == 'rover')) {
      const wasteMap = RoverCollectionRateMap[group.assets.find(item => item.tokenInfo.type == 'rover').tokenInfo.tier as RoverTier]
      return (wasteMap[group.ring] / wasteMap['A'] - 1)
    }


    if (group.assets.find(item => item.tokenInfo.type == 'facility')) {
      const energyMap = FacilityOutputCycle[group.assets.find(item => item.tokenInfo.type == 'facility').tokenInfo.tier]

      return 1 - (energyMap[group.ring] / energyMap['A'])
    }
  }

  return {
    energyProductionPerDay,
    wasteOutputPerDay,
    activePerkPercentage,
    totalEnergyProductionPerDay,
  }
}