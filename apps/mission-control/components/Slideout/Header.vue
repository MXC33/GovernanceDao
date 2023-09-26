<template lang="pug">
header(pos="sticky top-0" bg="black opacity-40" backdrop="~ blur-sm" b="lt-md:(t-1 $mc-accent-60)")

  div(h="0.75" w="12" bg="$mc-accent-light" opacity="40" pos="absolute top-2 left-50%" translate-x="-50%" rounded="lg" display="block md:none")

  div(space-y="6" w="full" p="x-4 t-4 y-2" b="b-1 $mc-accent-40")
    HList(justify="between" w="full" items="center" align="center")
      button(v-if="isNested" @touchstart.stop.prevent="$emit('stepBack')" @mousedown.stop.prevent="$emit('stepBack')" @touchend.stop.prevent @mouseup.stop.prevent)
        ChevronLeftIcon(icon-button="~")

      div(v-if="isNested" flex-center="row" uppercase="~" font="bold" text="base $mc-accent-light" space-x="2") 
        slot(name="nested-header")

      TitleWithIcon(v-else font="bold" icon="pointer" text="base $mc-accent-light" fill="$mc-accent-light") 
        GlitchText(:text="title")

      ButtonSound(@touchstart.stop.prevent="onClose" @mousedown.stop.prevent="onClose" p="x-2 y-2" sound="sm-x" @touchend.stop.prevent @mouseup.stop.prevent)
        CloseIcon(justify-self="end" icon-button="~" fill="$mc-accent-light" w="4" h="4")

    div(flex="~ row" justify="between" px="2" text="white" v-if="$slots.subheader")
      slot(name="subheader")

</template>

<script setup lang="ts">
import ChevronLeftIcon from '~/assets/images/ui/icon-chevron-left.svg?component'
import CloseIcon from '~/assets/images/ui/close.svg'
import type { TierId } from '~~/composables/NFTs/tiers';

const { buildSelectionGroup } = useBuildTools()
const onClose = () => emit('close')
const emit = defineEmits(["close", "stepBack", "clickHeader"])

defineProps<{
  title: string,
  tier?: TierId,
  isNested?: boolean,
  isMobile?: boolean
}>()
</script>
