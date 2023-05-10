export type ContractTier = 'apollo' | 'artemis' | 'helios' | 'chronos'
export type ContractDistrict = 'A' | 'B' | 'C1' | 'C2'
export const ContractIds = [35, 36, 37, 38]
export type ContractId = typeof ContractIds[number]

export const ContractTierMap: Record<ContractId, ContractTier> = {
  35: "apollo",
  36: "artemis",
  37: "helios",
  38: "chronos",
}

export const ContractDistrictMap: Record<ContractId, ContractDistrict> = {
  35: "A",
  36: "B",
  37: "C2",
  38: "C1",
}