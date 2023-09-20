<template lang="pug">
Tabs(:items="inventoryTabs", :active-item="activeInventoryTab" @select="clickTab", id="inventory-tabs" :visible-items="visibleItems" px="2 lg:4")
</template>

<script setup lang="ts">
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint()
const { inventoryTabs, activeInventoryTab } = useInventory()
const clickTab = (item) => activeInventoryTab.value = item

const visibleItems = ref(0)

watch([isMobile], ([mobile]) => visibleItems.value = mobile ? 2.5 : 6, { immediate: true })
</script>