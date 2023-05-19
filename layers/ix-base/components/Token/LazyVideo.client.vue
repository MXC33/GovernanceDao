<template lang="pug">
VList(ref="containerElement" w="full" h="full" pos="absolute" inset="0" )
  TokenImage(:token="token" pos="absolute" inset="0" object="contain center" :key="getTokenKey(token)")

  Transition(name="fade-slow")
    TokenVideo(:token="token" :is-large="true" pos="absolute" inset="0" object="contain center" h="full" v-lazy-show="displayVideo" :key="'video-' + getTokenKey(token)")

</template>

<script lang="ts" setup>
import type { AnyToken } from '~/composables/Token/useTokens';

const { getTokenKey } = useTokens()

const containerElement = ref()
const isElementHovered = useElementHover(containerElement)

const displayVideo = computed(() => hoverActive.value && props.token.video)

const hoverActive = computed(() => isElementHovered.value || props.isHovered)
const props = defineProps<{
  token: AnyToken,
  isHovered?: boolean
}>()

</script>
