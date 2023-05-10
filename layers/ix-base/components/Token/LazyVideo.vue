<template lang="pug">
VList(ref="containerElement" w="full" h="full" pos="absolute" inset="0" )
  TokenImage(:token="token" :is-large="true" pos="absolute" inset="0" object="contain center" :key="getTokenKey(token)")

  Transition(name="fade-slow")
    TokenVideo(:token="token" :is-large="true" pos="absolute" inset="0" object="contain center" h="full" v-lazy-show="hoverActive" :key="'video-' + getTokenKey(token)")

</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/Token/useTokens';

const containerElement = ref()
const isElementHovered = useElementHover(containerElement)

const { getTokenKey } = useTokens()
const hoverActive = computed(() => isElementHovered.value || props.isHovered)
const props = defineProps<{
  token: TokenIdentifier,
  isHovered?: boolean
}>()


</script>