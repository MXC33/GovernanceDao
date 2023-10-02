<template lang="pug">
div(pos="sticky top-0" bg="black opacity-40" backdrop="~ blur-sm" b="lt-md:(t-1 white opacity-40)")

  div(h="0.75" w="12" bg="white opacity-40" opacity="40" pos="absolute top-2 left-50%" translate-x="-50%" rounded="lg" display="block md:none")

  div()
    HList(justify="between" w="full" items="center" pt="2" pb="2" pl="4" pr="2" bg="mc-black")
      button(v-if="isNested" @touchstart.stop.prevent="$emit('stepBack')" @mousedown.stop.prevent="$emit('stepBack')" @touchend.stop.prevent @mouseup.stop.prevent)
        ChevronLeftIcon()

      div(v-if="isNested" flex-center="row" uppercase="~" font="bold" text="mc-orange" space-x="2") 
        slot(name="nested-header")

      TitleWithIcon(v-else font="bold" icon="pointer" text="white" fill="white") 
        GlitchText(:text="title")

      ButtonSound(@touchstart.stop.prevent="onClose" @mousedown.stop.prevent="onClose" p="x-2 y-2" sound="sm-x" @touchend.stop.prevent @mouseup.stop.prevent)
        CloseIcon(fill="white opacity-80" w="3.5")

    div(flex="~ row" justify="between" px="2" text="white" v-if="$slots.subheader")
      slot(name="subheader")

</template>

<script setup lang="ts">
import ChevronLeftIcon from '~/assets/images/ui/icon-chevron-left.svg?component'
import CloseIcon from '~/assets/images/ui/close.svg?component'
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
