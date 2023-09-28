<template lang="pug">
ListItem(:is-selected="isSelected", :token="task" @click="selectTask" :id="tileToId(task.tile)" :is-button-disabled="!canClaim" @click-action="onClickClaim" :key="getNftTokenKey(task, '-', true)" :can-claim="canClaim")
  template(#corner-info)
    HelperCornerInfo
      template(#tile) {{ getTileName(task.tile) }}
      template(#percent v-if="onTile != 'A'")
        HList(bg="mc-yellow" color="mc-black" px="1" cut="bottom-right s-xs" ml="-0.1") {{ capacityOnTile }}

  template(#progressbar)
    HelperProgressBarBig(:progress="progress" v-if="task.tokenInfo.status != 'wrecked'")

  template(#default)
    TaskManagerProductionTech(v-if="task.tokenInfo.type != 'facility'" :task="task" :displayValue="displayedValue")
      template(#value)
        span(color="mc-mint" v-if="displayedValue && task.status != 'wrecked'") {{ displayedValue }}
        span(color="mc-red" v-else) 0

    TaskManagerProductionFacility(v-else :task="task" :displayValue="displayedValue")

  template(#button) {{$t(`general.claim`)}}

</template>

<script setup lang="ts">
import { isAfter, isEqual } from 'date-fns'
import type { OrderTask } from '~~/composables/useTasks';

const { isTileSelected, selectedTile } = useTileSelection()
const { tileToId, getTileName } = useTiles()
const { getNftTokenKey } = useNFTs()
const { getTileRing } = useTiles()
const { canClaimResourceTask } = useTaskManager()
const { proposePickResources } = useStakeNFTFlow()
const isSelected = computed(() => isTileSelected(props.task.tile))

const props = defineProps<{
  task: OrderTask
}>()

const progress = computed(() => props.task.progress * 100)

const onClickClaim = () => {
  const { tile, resourceType, resourceAmount, position } = props.task
  proposePickResources([tile], resourceType, resourceAmount, [position])
}

const selectTask = () => {
  selectedTile.value = props.task.tile
}

const canClaim = computed(() => canClaimResourceTask(props.task))

const onTile = getTileRing(props.task.tile)

const techCapacity = computed(() => {
  switch (onTile) {
    case 'B':
      return '20%'
    case 'C1':
      return '20%'
    case 'C2':
      return '30%'
  }
})

const industryEfficiency = computed(() => {
  switch (onTile) {
    case 'B':
      return '10%'
    case 'C1':
      return '10%'
    case 'C2':
      return '20%'
  }
})

const capacityOnTile = computed(() => {
  switch (props.task.tokenInfo.type) {
    case 'rover':
      return techCapacity.value
    case 'drone':
      return techCapacity.value
    case 'facility':
      return industryEfficiency.value
  }
})

const { currentTime } = useGlobalTimestamp()
const frozenTime = currentTime.value
const isFinished = computed(() => {
  return isAfter(currentTime.value, Number(props.task.finishTime))
})

const displayedValue = computed(() => {
  const { months, days, hours, minutes } = useIntervalWithDays(currentTime.value, frozenTime + props.task.timeLeft * 1000)

  if (isFinished.value)
    return 'completed'
  const optMonth = months > 0 ? `${months}Mth.` : ''
  return `${optMonth}${days}D.${hours}H.${minutes}M`
})


</script>