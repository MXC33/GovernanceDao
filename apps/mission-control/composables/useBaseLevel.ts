import { Corporation } from "./corporations/useCorporations"


export const useBaseLevelCapacityData = () => {

  const asyncState = useAsyncDataState('base-level-capacity', async () => {
    const { playerBaseLevel } = useUserData()

    const level = playerBaseLevel.value
    const baseLevelData = await GqlBaseLevelCapacities({ level })
    return baseLevelData
  }, { transform: (data) => data?.baseLevelCapacities })

  const gwsCapacity = computed(() => capacityForCorporation('gws'))
  const elCapacity = computed(() => capacityForCorporation('eternalab'))
  const nlCapacity = computed(() => capacityForCorporation('new-lands'))

  const capacityForCorporation = (corporation: Corporation) =>
    asyncState.data?.value?.find(item => item.name === corporation)?.capacity

  return {
    ...asyncState,
    gwsCapacity,
    elCapacity,
    nlCapacity
  }
}