<template lang="pug">
img(:src="icon")
</template>

<script lang="ts" setup>
import type { InventoryTab } from '~~/composables/useInventory';

import TechIcon from '~/assets/images/ui/inventory/icon-tech.png'
import IndustryIcon from '~/assets/images/ui/inventory/icon-facilities.png'

import LandIcon from '~/assets/images/ui/inventory/icon-land.png'
import ResourceIcons from '~/assets/images/ui/inventory/icon-resources.png'
import MiscIcon from '~/assets/images/ui/inventory/icon-misc.png'
import CollectablesIcon from '~/assets/images/ui/inventory/icon-cosmetics.png'

const icon = computed(() => {
  switch (props.icon) {
    case 'land': return LandIcon
    case 'tech': return TechIcon
    case 'industry': return IndustryIcon
    case 'resources': return ResourceIcons
    case 'cargo': return MiscIcon
    case 'collectables': return CollectablesIcon
  }
})

const props = defineProps<{
  icon: InventoryTab
  isActive: boolean
}>()

</script>