<template lang="pug">
CorporationPage(@click-back="goBack" @click-next="goForward('exchange')" :can-proceed="true")
  template(#title)
    TitleWithPointer() {{ $t(`corporations.${corporationRouteI18n}.title`) }}

  template(#default)
    CorporationActionIntro(:tokens="tokens")

  template(#buttonBack) Exit
  template(#buttonNext) Next

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'
const { corporationRouteI18n, goForward, goBack } = useCorporationRoute()

const tokens: NftFragment[] = [{ tokenInfo: { type: 'astro-gold-ixt' } }]

definePageMeta({
  middleware: 'auth',
  layout: "corporation"
})
</script>