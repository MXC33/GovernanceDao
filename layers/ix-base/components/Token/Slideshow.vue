<template lang="pug">
Carousel(:items-to-show="1" :autoplay="2000" :wrap-around="true")
  Slide(v-for="(token, index) in tokens" :key="index")
    TokenImage(:token="token" :key="getTokenKey(token, '-', true)" h="full" w="full" pos="absolute")

</template>
        
<script lang="ts" setup>
import { Carousel, Slide } from 'vue3-carousel'
import type { AnyToken } from '~/composables/Token/useTokens';
const { getTokenKey } = useTokens()

defineProps<{
  tokens: AnyToken[]
}>()

</script>

<style>
.carousel,
.carousel__viewport,
.carousel__track {
  flex-grow: 1;
  height: 100%;
}
</style>