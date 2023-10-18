<template lang="pug">
Carousel(:items-to-show="tokens.length == 1 ? 0 : 1" :autoplay="2000" :wrap-around="true" v-if="tokens.length > 1")
  Slide(v-for="(token, index) in tokens" :key="index")
    TokenMedia(:token="token" :key="getTokenKey(token)" h="full" w="full" pos="absolute" inset="0" :icon="icon" :image="image" :contain="true")


TokenMedia(:token="tokens[0]" :key="getTokenKey(tokens[0])" :icon="icon" :image="image" v-else-if="tokens.length == 1" :contain="true")

</template>
    
<script lang="ts" setup>
import type { AnyToken } from 'composables/Token/useTokens';
import { Carousel, Slide } from 'vue3-carousel'

defineProps<{
  tokens: AnyToken[]
  icon?: boolean
  image?: boolean
}>()

</script>

<style>
.carousel__slide {
  width: 100%;
}
</style>