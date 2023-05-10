export type DroneTier = 'genesis' | 'piercer' | 'night'

export const DroneIds = [4, 5, 33]

export type DroneId = typeof DroneIds[number]

export const DroneTierMap: Record<DroneId, DroneTier> = {
  4: "genesis",
  5: "piercer",
  33: "night",
}

export const DronePlaycanvasMap: Record<DroneId, number> = {
  4: 2,
  5: 1,
  33: 3
}

export const DronePowerRequirement: Record<DroneId, number> = {
  4: 3,
  5: 6,
  33: 9
}