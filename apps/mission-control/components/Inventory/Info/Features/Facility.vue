<template lang="pug">
InfoBoxRow()
  InfoBox() {{ $t(`inventory.info.landTierReq`) }}
  InfoBox() {{ token.tokenInfo.tier }}

InfoBoxRow()
  InfoBox() {{$t(`inventory.info.energyOutCycle`)}}
  InfoBox() 
    span(color="mc-mint") {{ energyOutputCycle }}

</template>

<script setup lang="ts">
import { FacilityOutputCycle } from '~~/composables/NFTs/useFacility';

import type { NftFragment } from '#gql'

const { token } = defineProps<{
  token: NftFragment
}>()

const energyOutputCycle = computed(() =>
  FacilityOutputCycle[token.tokenInfo.tier]['A']
)

const color = computed(() => getTierColor(token.tokenInfo.tier))

</script>