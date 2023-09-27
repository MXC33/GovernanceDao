<template lang="pug">
VList(space-y="12")
  TaskManagerCorporationSection() 
    template(#title) Building Facility

    template(#default)
      TaskManagerOrderList(:corporation-order-id="buildId")

  TaskManagerCorporationSection() 
    template(#title) Upgrading Facility

    template(#default)
      TaskManagerOrderList(:corporation-order-id="upgradeId")

</template>

<script setup lang="ts">
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';

const buildId: CorporationOrderId = { type: 'new-lands', task: 'craft' }
const upgradeId: CorporationOrderId = { type: 'new-lands', task: 'upgrade' }

</script>