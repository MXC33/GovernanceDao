<template lang="pug">
TaskManagerCorporationSection() 
  template(#title) Waste Collection

  template(#summary)
    InfoSummaryRow()
      template(#left) NO. ROVERS:
      template(#right) {{ activeItems.length }}
    InfoSummaryRow()
      template(#left) COMPLETED TASK:
      template(#right) {{ currentCompletedTasks }}/{{ activeItems.length }}
    InfoSummaryRow()
      template(#left) WASTE COLLECTED:
      template(#right) {{currentTotalRoverWasteCollected}}


  template(#default)
    TaskManagerProductionList(:items="activeItems")

  template(#buttons)
    TaskManagerCorporationClaimAll(:token="rover" type="production")

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { selectedCorporation, getProductionTasks, getTotalWasteCollected, completedTaskAmount } = useTaskManager()

const rover: NftFragment = { tokenInfo: { type: 'rover' } }

const activeItems = computed(() => {
  return getProductionTasks(selectedCorporation.value).filter(item => item.tokenInfo.type == 'rover')
})

const currentTotalRoverWasteCollected = computed(() => {
  return getTotalWasteCollected('rover')
})

const currentCompletedTasks = computed(() => {
  return completedTaskAmount(selectedCorporation.value, 'rover')
})

</script>
