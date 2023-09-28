<template lang="pug">
ListContainer(space-y="3" flex-grow="1" h="full")
  Transition(name="slide-left" mode="out-in")
    TaskManagerNewLands(v-if="selectedCorporation == 'new-lands'" :key="0")
    TaskManagerYSpace(v-else-if="selectedCorporation == 'y-space'" :key="1")
    TaskManagerEternalab(v-else-if="selectedCorporation == 'eternalab'" :key="2")
    TaskManagerGWS(v-else-if="selectedCorporation == 'gws'" :key="3")


</template>

<script setup lang="ts">
const { selectedCorporation, setTabs, tabs } = useTaskManager()

const currentTabs = computed(() => {
  switch (selectedCorporation.value) {
    case 'new-lands':
      return ['mc-production', 'corp-orders']
  }
  return []
})

onBeforeMount(() => setTabs(currentTabs.value))
onUnmounted(() => selectedCorporation.value = null)
</script>
