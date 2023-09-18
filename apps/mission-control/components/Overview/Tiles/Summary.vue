<template lang="pug">
VList(gap="4" uppercase="~")

  VList
    OverviewPerksTitle

      template(#header) {{ $t(`overview.tiles.contract-perks`) }}
      template(#info)
        HelperInfoWrapper
          template(#info-here) {{ $t(`overview.info.perks`) }}

    OverviewPerksProgression
      template(#icon)
        WASTE
      template(#title)
        div {{ $t(`overview.tiles.spawn-rate`) }}
      template(#perk)
        div {{spawnRate}}

    OverviewPerksProgression
      template(#icon)
        WASTE
      template(#title)
        div {{ $t(`overview.tiles.tech-cap`) }}
      template(#perk)
        div {{techCapacity}}

    OverviewPerksProgression
      template(#icon)
        INDUSTRY
      template(#title)
        div {{ $t(`overview.tiles.industry`) }}
      template(#perk)
        div {{industryEfficiency}}

</template>
<script lang="ts" setup>
import WASTE from '~/assets/images/ui/corporations/overview/waste-icon.svg'
import INDUSTRY from '~/assets/images/ui/corporations/overview/industry-icon.svg'
import type { TileContract } from '~~/composables/useTileContract'

const props = defineProps<{
  contract: TileContract
}>()

const spawnRate = computed(() => {
  switch (props.contract.ring) {
    case 'B':
      return "100%"
    case 'C1':
      return "150%"
    case 'C2':
      return "200%"
  }
})

const techCapacity = computed(() => {
  switch (props.contract.ring) {
    case 'B':
      return "20%"
    case 'C1':
      return "20%"
    case 'C2':
      return "30%"
  }
})

const industryEfficiency = computed(() => {
  switch (props.contract.ring) {
    case 'B':
      return "10%"
    case 'C1':
      return "10%"
    case 'C2':
      return "20%"
  }
})


</script>