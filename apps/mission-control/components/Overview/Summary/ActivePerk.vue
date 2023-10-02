<template lang="pug">
OverviewSummaryRow()
  template(#icon)
    PerkLogo(w="4" h="4")

  template(#name v-if="isFacility") {{ $t(`overview.industryEfficiency`) }}
  template(#name v-else) {{ $t(`overview.techEfficiency`) }}

  template(#amount)
    span(color="mc-mint") +{{ output }}%
  
</template>
<script lang="ts" setup>
import NewlandsLogo from '~/assets/images/ui/corporations/new-lands/logo-inverted.svg'
import YSpaceLogo from '~/assets/images/ui/corporations/y-space/logo.svg'

import type { TileGroup } from '~~/composables/useTiles';

const { activePerkPercentage } = useTileMetaData()
const output = computed(() => Math.round(activePerkPercentage(props.group) * 100))

const PerkLogo = computed(() => isFacility.value ? NewlandsLogo : YSpaceLogo)

const isFacility = computed(() => props.group.assets?.find(item => item.tokenInfo.type == 'facility'))

const props = defineProps<{
  group: TileGroup
}>()
</script>