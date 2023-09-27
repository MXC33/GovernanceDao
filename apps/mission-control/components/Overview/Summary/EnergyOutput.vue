<template lang="pug">
OverviewSummaryRow()
  template(#icon)
    EnergyIcon(w="4" h="4")

  template(#name) {{ $t(`overview.energyOutput`) }}

  template(#amount) {{ output }}

</template>
<script lang="ts" setup>
import EnergyIcon from '~/assets/images/ui/corporations/overview/industry-icon.svg'
import type { TileGroup } from '~~/composables/useTiles';

const { energyProductionPerDay } = useTileMetaData()
const output = computed(() => Math.round(energyProductionPerDay(props.group.land?.tokenInfo.type, props.group.assets?.find(item => item.tokenInfo.type == 'facility').tokenInfo.tier, props.group.ring, props.group.assets?.find(item => item.tokenInfo.type == 'facility').tokenInfo?.level) * 100) / 100)

const props = defineProps<{
  group: TileGroup
}>()

</script>