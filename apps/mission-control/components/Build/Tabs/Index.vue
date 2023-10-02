<template lang="pug">
GameMenuTabs()

  GameMenuTabsItem(@click="changeBuildMode('build')" :active="buildMode == 'build'") {{$t(`general.build.build`)}}

  GameMenuTabsItem(@click="changeBuildMode('contracts')" :active="buildMode == 'contracts'") {{$t(`general.build.contracts`)}}

</template>

<script setup lang="ts">
import type { BuildMode } from '~/composables/useBuildTools'
const buildMode = useBuildToolMode()
const { clearStaking } = useStakeNFTContracts()

const changeBuildMode = (type: BuildMode) => {
  buildMode.value = type
  clearStaking()
}
</script>