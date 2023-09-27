<template lang="pug">
GameMenuWrapper(:sub-menu-open="subMenuOpen")
  template(#tabs)
    OverviewTabs()

  template(#default)
    OverviewOverview(v-if="overviewMode == 'tiles'")
    OverviewPerks(v-else-if="overviewMode == 'perks'")

  template(#sub-menu)
    OverviewList
    
</template>

<script lang="ts" setup>
const { setupListeners, cancelBuilding } = useBuildTools()
const overviewMode = useOverviewToolMode()

const tileGroups = useTileData()

const subMenuOpen = computed(() =>
  tileGroups == null
)

onMounted(() => setupListeners())
onUnmounted(() => cancelBuilding())
</script>