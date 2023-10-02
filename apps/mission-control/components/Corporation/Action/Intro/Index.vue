<template lang="pug">
CorporationActionContainer()

  CorporationActionIntroText(min-h="0" min-w="0")

  CorporationBorderBox(:title="$t(`corporations.${corporationRouteI18n}.previewOutcome`)" cut-style="bottom-right lg")

    TokenVideo(v-if="tokens.length == 1" :token="tokens[0]")

    Carousel(v-else h="100" :items-to-show="tokens.length == 1 ? 0 : 1" flex="~ col grow" :autoplay="2000" :wrap-around="true")

      Slide(v-for="(token, index) in tokens" :key="index")
        CorporationSlideshowItem(:token="token" :key="index" h="full")
        
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'
import { Carousel, Slide } from 'vue3-carousel'
const { corporationRouteI18n } = useCorporationRoute()

defineProps<{
  tokens: NftFragment[]
}>()
</script>