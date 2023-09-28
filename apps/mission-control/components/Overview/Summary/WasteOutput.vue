<template lang="pug">
OverviewSummaryRow()
  template(#icon)
    WasteIcon(w="4" h="4")

  template(#name)
    span(uppercase="~") {{ $t(`overview.wasteOutput`) }}

  template(#amount) {{ output }}
</template>
<script lang="ts" setup>
import WasteIcon from '~/assets/images/ui/resources/waste-icon.svg'
import type { TileGroup } from '~~/composables/useTiles';

const { wasteOutputPerDay } = useTileMetaData()
const output = computed(() => wasteOutputPerDay(props.group.ring, props.group.assets, true))

const props = defineProps<{
  group: TileGroup
}>()


</script>