<template lang="pug">
TaskManagerCorporationSection() 
  template(#title) {{ $t(`taskManager.order.new-lands.energy-production`) }}

  template(#summary)
    InfoSummaryRow()
      template(#left) {{ $t(`taskManager.order.new-lands.number-facilities`) }}
      template(#right) {{ currentOrders.length }}
    InfoSummaryRow()
      template(#left) {{ $t(`taskManager.order.new-lands.completed-tasks`) }}
      template(#right) {{ currentCompletedTasks }}/{{ currentOrders.length }}
    InfoSummaryRow()
      template(#left) {{ $t(`taskManager.order.new-lands.energy-produced`) }}
      template(#right) {{ currentTotalEnergyCollected }}

  template(#default)
    TaskManagerProductionList(:items="currentOrders")

  template(#buttons)
    TaskManagerCorporationClaimAll(:token="facility" type="production")

</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const { getProductionTasks, getTotalEnergyCollected, completedTaskAmount } = useTaskManager()

const facility: NftFragment = { tokenInfo: { type: 'facility' } }

const currentOrders = computed(() => {
  return getProductionTasks('new-lands')
})

const currentTotalEnergyCollected = computed(() => {
  return getTotalEnergyCollected()
})

const currentCompletedTasks = computed(() => {
  return completedTaskAmount('new-lands', 'facility')
})

//
// No production work here because I have hardcoded tokenId 7 (waste) in API because rovers give wrong Id.
//

</script>
