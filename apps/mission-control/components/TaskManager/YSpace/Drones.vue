<template lang="pug">
TaskManagerCorporationSection() 
  template(#title) Waste Collection

  template(#summary)
    InfoSummaryRow()
      template(#left) NO. DRONES:
      template(#right) {{ activeItems.length }}
    InfoSummaryRow()
      template(#left) COMPLETED TASK:
      template(#right) {{ currentCompletedTasks }}/{{ activeItems.length }}
    InfoSummaryRow()
      template(#left) WASTE COLLECTED:
      template(#right) {{ currentTotalDroneWasteCollected }}

  template(#default)
    TaskManagerProductionList(:items="activeItems")

  template(#buttons)
    TaskManagerCorporationClaimAll(:token="drone" type="production")

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { selectedCorporation, getProductionTasks, getTotalWasteCollected, completedTaskAmount } = useTaskManager()

const drone: NftFragment = { tokenInfo: { type: 'drone' } }
const activeItems = computed(() => {
  return getProductionTasks(selectedCorporation.value)
    .filter(item => item.tokenInfo.type == 'drone')
})

const currentTotalDroneWasteCollected = computed(() => {
  return getTotalWasteCollected('drone')
})

const currentCompletedTasks = computed(() => {
  return completedTaskAmount('y-space', 'drone')
})

</script>
