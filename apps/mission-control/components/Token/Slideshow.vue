<template lang="pug">
Carousel(:items-to-show="tokens.length == 1 ? 0 : 1" :autoplay="2000" :wrap-around="true")
  Slide(v-for="(token, index) in tokens" :key="index")
    TokenMedia(:token="token" :key="getTokenKey(token)" h="full" w="full" pos="absolute" :icon="icon" :image="image")
  
    </template>
      
<script lang="ts" setup>
import type { NftFragment } from '#gql'
import { getTokenKey } from '@ix/base/composables/Token/useTokens';
import { Carousel, Slide } from 'vue3-carousel'

defineProps<{
  tokens: NftFragment[]
  icon?: boolean
  image?: boolean
}>()

</script>