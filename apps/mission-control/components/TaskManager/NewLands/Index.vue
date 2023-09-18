<template lang="pug">
TaskManagerCorporationTabs(:tabs="tabs", v-model="activeTab")
  TaskManagerNewLandsProduction(v-if="activeTab == 'mc-production'")
  TaskManagerNewLandsOrders(v-else)

</template>

<script setup lang="ts">
const tabs = ["mc-production", "orders"] as const
const activeTab = ref<typeof tabs[number]>(tabs[0])

const { fetchBurnedAvatar } = useTaskManager()
await fetchBurnedAvatar()
</script>
