<template lang="pug">
TokenImage(v-if="displayStillImage" :token="token" :is-large="(!icon && isLarge) || image" :key="componentKey")

TokenVideo(v-else :token="token" :is-large="isLarge" h="full" inset="0" :key="componentKey + 'video'")
</template>

<script lang="ts" setup>

import type { TokenIdentifier } from '~/composables/useTokens'

const { getTokenKey } = useTokens()

const props = defineProps<{
  token: TokenIdentifier,
  isLarge?: boolean,
  icon?: boolean
  image?: boolean
}>()

const imageTokens = ['pix', 'anniversary-pack', 'loot-crate', 'starter-pack', 'coinbase', 'gg', 'arcade', 'tile-contract', 'cargo-drop', 'avatar', 'aoc-badge']

const displayStillImage = computed(() => props.icon || props.image || imageTokens.includes(props.token.type))


const componentKey = computed(() => props.token && getTokenKey(props.token))



</script>