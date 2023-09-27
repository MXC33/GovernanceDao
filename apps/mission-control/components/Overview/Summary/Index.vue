<template lang="pug">
OverviewSummaryWrapper(uppercase="~")

  OverviewSummaryActivePerk(:group="tile" v-if="tile.ring != 'A'")

  OverviewSummaryEnergyOutput(v-if="tile.assets.some(item => item.tokenInfo.type == 'facility')" :group="tile")
  OverviewSummaryWasteOutput(v-else :group="tile")


</template>

<script setup lang="ts">
import type { TileGroup } from '~~/composables/useTiles';

defineProps<{
  tile: TileGroup
}>()

</script>