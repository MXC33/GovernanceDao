<template lang="pug">
GameMenuTabs()

  GameMenuTabsItem(@click="changeOverviewMode('tiles')" :active="overviewMode == 'tiles'") {{$t(`general.build.tiles`)}}

  GameMenuTabsItem(@click="changeOverviewMode('perks')" :active="overviewMode == 'perks'") {{$t(`general.build.perks`)}}

</template>

<script setup lang="ts">
import type { OverviewMode } from '~/composables/useBuildTools'
const overviewMode = useOverviewToolMode()

const changeOverviewMode = (type: OverviewMode) => {
  overviewMode.value = type
}
</script>