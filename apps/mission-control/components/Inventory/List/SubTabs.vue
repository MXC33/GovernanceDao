<template lang="pug">
InventoryListHeader(divide-x="1" flex="~ row shrink-0 nowrap")
  InventoryListSubTab(:title="tab" v-for="tab in tabs" @click="clickTab(tab)" :is-active="activeTab == tab" )
</template>

<script lang="ts" setup>
const emits = defineEmits(["selectTab"])

defineProps<{
  tabs: string[],
  activeTab: string
}>()

const clickTab = (section: string) => {
  emits("selectTab", section)
}
</script>