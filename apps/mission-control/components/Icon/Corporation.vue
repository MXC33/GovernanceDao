<template lang="pug">
component(:is="icon" max-h="full" max-w="full")
</template>

<script lang="ts" setup>
import GWSIcon from '~/assets/images/ui/logos/gws.svg'
import MCIcon from '~/assets/images/ui/logos/mclevel-icon.svg'
import NewlandsIcon from '~/assets/images/ui/logos/newlands.svg'
import Y_Icon from '~/assets/images/ui/logos/y_.svg'
import EternalabIcon from '~/assets/images/ui/logos/eternalab.svg'
import LukcyCatIcon from '~/assets/images/ui/logos/lucky-cat.svg'
import type { Corporation } from '~~/composables/corporations/useCorporations'

const icon = computed(() => {
  switch (props.corporation) {
    case 'eternalab': return EternalabIcon
    case 'gws': return GWSIcon
    case 'new-lands': return NewlandsIcon
    case 'mc': return MCIcon
    case 'y-space': return Y_Icon
    case 'lucky-cat': return LukcyCatIcon
  }
})
const props = defineProps<{
  corporation: Corporation
}>()

</script>
