<template lang="pug">
img(:src="iconPath" :title="icon")
</template>

<script lang="ts" setup>
import type { UserResource } from '~~/composables/useUserData';

import SekIcon from '~/assets/images/ui/resources/sek.png'
import AstroIcon from '~/assets/images/ui/resources/nft.png'
import PowerIcon from '~/assets/images/ui/resources/power.png'
import DronesIcon from '~/assets/images/ui/resources/drones.png'
import WasteIcon from '~/assets/images/ui/resources/waste.png'
import EnergyIcon from '~/assets/images/ui/resources/energy.png'

const iconPath = computed(() => {
  switch (props.icon) {
    case 'drone': return DronesIcon
    case 'waste': return WasteIcon
    case 'ixt': return SekIcon
    case 'astro-credit': return AstroIcon
    case 'power': return PowerIcon
    case 'energy': return EnergyIcon
  }
})

const props = defineProps<{
  icon: UserResource
}>()

</script>

<style>
svg.svg-shadow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}
</style>