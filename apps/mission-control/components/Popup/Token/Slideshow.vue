<template lang="pug">
VList(cursor="pointer" bg="white opacity-20" py="4" corners="~ lg")
  Carousel(:items-to-show="isMobile ? 2.2 : 3" :snap-align="snapAlign" :autoplay="isCarousel ? 2000 : 0" :wrap-around="isCarousel" ref="orderCarousel" :touch-drag="true" v-model="slideIndex")

    Slide(v-for="(item, index) in items" :key="index" h="full" p="2 md:4")
      TokenDisplay(:token="item" w="full" text="lt-md:xs")

</template>

<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'

import type { NftFragment } from '#gql'

const isMobile = useMobileBreakpoint()
const slideIndex = ref(0)
const isCarousel = computed(() => props.items.length > (isMobile.value ? 2 : 3))

const snapAlign = computed(() => {
  switch (props.items.length) {
    case 1:
      return 'center'
    case 2:
      return 'center-even'
    case 3:
      return 'center-even'
    default:
      return 'start'
  }
})

const props = defineProps<{
  items: NftFragment[]
}>()
</script>
