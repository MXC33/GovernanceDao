<template lang="pug">
VList(pb="6")
  TaskManagerCorporationSection() 
    template(#title) {{$t(`taskManager.refiningWaste`)}}

    template(#speedup)
      TaskManagerCorporationSpeedupAll()

    template(#default)
      TaskManagerOrderList(:corporation-order-id="craftId")

    template(#buttons)
      TaskManagerCorporationClaimAll(type="orders", :order-id="craftId")

  TaskManagerCorporationSection() 
    template(#title) M3ta-m0d Fusion

    template(#default)
      TaskManagerOrderList(:corporation-order-id="fusionId")

</template>

<script setup lang="ts">
import type { CorporationOrderId } from '~/composables/corporations/order/defineOrderContract';


const { fetchBurnedAvatar } = useTaskManager()
await fetchBurnedAvatar()
const craftId: CorporationOrderId = { type: 'eternalab', task: 'craft' }
const fusionId: CorporationOrderId = { type: 'eternalab', task: 'fusion' }

</script>
