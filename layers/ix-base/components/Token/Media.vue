<template lang="pug">
TokenImage(v-if="displayStillImage" :token="token" :is-large="(!icon && isLarge) || image" :key="componentKey")

TokenVideo(v-else :token="token" :is-large="isLarge" h="full" inset="0" :key="componentKey + 'video'")
</template>

<script lang="ts" setup>

import type { TokenIdentifier } from '~/composables/Token/useTokens'

const { getTokenKey } = useTokens()

const props = defineProps<{
  token: TokenIdentifier,
  isLarge?: boolean,
  icon?: boolean
  image?: boolean
}>()


const componentKey = computed(() => props.token && getTokenKey(props.token))



</script>