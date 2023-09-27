<template lang="pug">
component(:is="listComponent")
</template>

<script lang="ts" setup>
import LandTab from '~~/components/Inventory/List/Tab/Land.vue'
import DefaultTab from '~~/components/Inventory/List/Tab/Default.vue'

const { activeInventoryTab } = useInventory()

const listComponent = computed(() => {
  switch (activeInventoryTab.value) {
    case 'land': return LandTab
    default: return DefaultTab
  }
})

</script>