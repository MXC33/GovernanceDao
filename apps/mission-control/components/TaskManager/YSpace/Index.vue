<template lang="pug">
TaskManagerCorporationTabs(:tabs="tabs", v-model="activeTab")
  TaskManagerYSpaceDrones(v-if="activeTab == 'drones'")
  TaskManagerYSpaceRovers(v-else)

</template>

<script setup lang="ts">
const { tabs, activeTab } = useYSpaceTaskManager()
const { fetchBurnedAvatar } = useTaskManager()
await fetchBurnedAvatar()
</script>
