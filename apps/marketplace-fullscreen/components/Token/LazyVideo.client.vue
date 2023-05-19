<template lang="pug">
VList(ref="containerElement" w="full" h="full" pos="absolute" inset="0" )
  TokenImage(:token="token" pos="absolute" inset="0" object="contain center" :key="token.collection + token.token_id")

  Transition(name="fade-slow")
    TokenVideo(:token="token" :is-large="true" pos="absolute" inset="0" object="contain center" h="full" v-lazy-show="displayVideo" :key="'video-' + token.collection + token.token_id")

</template>

<script lang="ts" setup>
import type { IXToken } from '~/composables/useCollection'

const containerElement = ref()
const isElementHovered = useElementHover(containerElement)

const displayVideo = computed(() => hoverActive.value && props.token.video)

const hoverActive = computed(() => isElementHovered.value || props.isHovered)
const props = defineProps<{
  token: IXToken,
  isHovered?: boolean
}>()

</script>
