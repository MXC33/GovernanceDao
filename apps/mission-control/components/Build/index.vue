<template lang="pug">
GameMenuWrapper(:sub-menu-open="subMenuOpen")
  template(#tabs)
    BuildTabs()

  template(#default)
    BuildBuild(v-if="buildMode == 'build'")
    BuildContractOverview(v-else)

  template(#sub-menu)
    BuildListSelectLand(v-if="buildSelectionGroup != null")
    BuildContractDetails(v-else-if="selectedContract" :contract="selectedContract")
      
</template>

<script setup lang="ts">
const { setupListeners, cancelBuilding, buildSelectionGroup } = useBuildTools()
const buildMode = useBuildToolMode()
const { selectedContract } = useTileContract()
const subMenuOpen = computed(() =>
  buildSelectionGroup.value != null ||
  selectedContract.value != null
)


onMounted(() => setupListeners())
onUnmounted(() => cancelBuilding())
</script>