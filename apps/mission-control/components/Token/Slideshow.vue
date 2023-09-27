<template lang="pug">
Carousel(:items-to-show="tokens.length == 1 ? 0 : 1" :autoplay="2000" :wrap-around="true")
  Slide(v-for="(token, index) in tokens" :key="index")
    TokenMedia(:token="token" :key="getNftTokenKey(token, '-', true)" h="full" w="full" pos="absolute" :icon="icon" :image="image")
  
    </template>
      
<script lang="ts" setup>
import type { NftFragment } from '#gql'
import { Carousel, Slide } from 'vue3-carousel'
const { getNftTokenKey } = useNFTs()

defineProps<{
  tokens: NftFragment[]
  icon?: boolean
  image?: boolean
}>()

</script>