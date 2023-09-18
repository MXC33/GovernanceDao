<template lang="pug">
VList(w="full")
  TitleWithIcon(icon="pointer" :fill="facilityColor")
    TokenName(:token="task" font="bold" :key="getNftTokenKey(task, '-', true)" :color="facilityColor")

  ListItemProps
    template(#name) {{ $t('taskManager.dailyOutput') }}
    template(#value)
      HList(color="mc-yellow")
        div() {{ outputTile }}
        HList(w="3" translate-y="-3%" mx="1")
          PowerIcon()

  ListItemProps()
    template(#name) {{ task.resourceType }} {{ $t('taskManager.harvesting') }}
    template(#value) 
      HList()
        div(color="mc-mint") {{ task.resourceAmount }}/{{ task.cap }}
        HList(w="2.5" translate-y="-2%" mx="1")
          EnergyIcon()

  ListItemProps()
    template(#name) {{ $t(`taskManager.order.new-lands.next-energy`) }}
    template(#value) {{ nextEnergy }}

  ListItemProps()
    template(#name) ET.
    template(#value) 
      span(v-if="displayValue == 'completed'" color="mc-mint") {{ displayValue }}
      span(v-else color="gray-50") {{ displayValue }}

</template>

<script lang="ts" setup>
import type { OrderTask } from '~~/composables/useTasks';
import type { FacilityTier } from '~~/composables/NFTs/useFacility';
import EnergyIcon from '~/assets/images/ui/resources/energy-icon.svg'
import PowerIcon from '~/assets/images/ui/resources/power-icon.svg'
import { isAfter } from 'date-fns';

const { findTileGroup } = useTiles()
const { energyProductionPerDay } = useTileMetaData()
const { getNftTokenKey } = useNFTs()

const props = defineProps<{
  task: OrderTask
  displayValue: string
}>()

const { currentTime } = useGlobalTimestamp()

const outputTile = computed(() => {
  const tiles = findTileGroup(props.task.tile)
  const stakedFacility = tiles.assets?.find(item => item.tokenInfo.type == 'facility')
  return Math.round(energyProductionPerDay(tiles.land?.tokenInfo.type, stakedFacility.tokenInfo.tier as FacilityTier, tiles.ring, stakedFacility.tokenInfo?.level) * 100) / 100
})

const energyOutputCycle = computed(() =>
  FacilityOutputCycle[props.task.tokenInfo.tier][findTileGroup(props.task.tile).ring]
)

const isFinished = computed(() => {
  return isAfter(currentTime.value, Number(props.task.finishTime))
})


const frozenTimestamp = ref(0)


onBeforeMount(() => {
  frozenTimestamp.value = currentTime.value

})

const nextEnergy = computed(() => {
  const hoursToMS = 60 * 60 * 1000
  const hoursToSeconds = 60 * 60

  const cycle = energyOutputCycle.value // 8 hours for leg facil
  const totalTimeInHours = (props.task.cap / outputTile.value) * 24 // 133 hours for leg facil
  const diff = totalTimeInHours % cycle  // 5 for leg facil
  const trueDiff = (cycle - diff) * hoursToSeconds // 8 - 5 = 3 for leg facil
  const timeLeftInHours = props.task.timeLeft / 60 / 60
  const maybeDiff = timeLeftInHours < cycle ? 0 : trueDiff

  const timeLeft = (props.task.timeLeft + maybeDiff) * 1000
  const cycleInMS = (cycle * hoursToMS)

  const timeToNextTick = timeLeft % cycleInMS


  const { hours, minutes, seconds } = useIntervalWithDays(currentTime.value, frozenTimestamp.value + timeToNextTick)

  if (!isFinished.value)
    return `${hours}H.${minutes}M.${seconds}S`

  return `0H.0M.0S`
})

const facilityColor = computed(() => {
  switch (props.task.tokenInfo.tier) {
    case 'legendary':
      return 'tier-gold'
    case 'rare':
      return 'tier-purple'
    case 'uncommon':
      return 'tier-blue'
    case 'common':
      return 'tier-green'
    case 'outlier':
      return 'tier-white'
  }
})

</script>