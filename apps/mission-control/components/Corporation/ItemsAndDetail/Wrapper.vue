<template lang="pug">
CorporationPage(@click-back="goBack")
  template(#title)
    TitleWithPointer
      template(#default v-if="!header") {{ $t(`corporations.${corporationRouteI18n}.header`) }}

      template(#default v-else) {{ header }}

  VList(min-h="md:0" flex-grow="1")
    div(grid="~ cols-1 md:cols-2 gap-6" mb="-1px")

      HList(justify="start" v-if="$slots.tabs" w="full")
        slot(name="tabs")

    CorporationActionContainer()

      CorporationBorderBox(:title="listTitle" cut="md:top-right s-lg b-$mc-accent" b="lt-md:!0")
        slot(name="noItems" v-if="$slots.noItems")

        div(v-if="$slots.infoBlocks")
          slot(name="infoBlocks")

        div(grid="~ cols-2 xl:cols-3 2xl:cols-3 3xl:cols-5 gap-4" mb="lt-md:4" v-else-if="$slots.grid")
          slot(name="grid")

        VList(v-else-if="$slots.list" flex-grow="1" gap="4" justify="start" items="start")
          slot(name="list")

          div(flex-grow="1")

          div(pos="sticky bottom-0" w="full")

            Transition(name="fade")
              slot(name="afterList")


        template(#outsideScroll)
          Transition(name="fade")
            CorporationCartWrapper(v-if="$slots.cartLeft")
              slot(name="cartLeft")

      CorporationItemsAndDetailSingle(v-if="!isMobile" :item="activeItem")
        slot(name="cartRight")

  template(#afterContent)
    Slideout(v-if="isMobile" title="Item details" :is-open="activeItem != null" @close="$emit('close')")
      CorporationItemsAndDetailSingle(:item="activeItem" b="!0" title="" p="0")
        slot(name="cartRight")

  template(#buttonBack) {{ $t(`general.back`) }}

</template>

<script lang="ts" setup>
import type { TokenWithInfoBlocks } from '~~/composables/useInfoBlocks';

const isMobile = useMobileBreakpoint('md')
const { goBack, corporationRouteI18n } = useCorporationRoute()

defineEmits(["close"])

defineProps<{
  header?: string,
  listTitle?: string,
  detailTitle: string,
  activeItem?: TokenWithInfoBlocks,
  list?: TokenWithInfoBlocks[],
}>()

</script>
