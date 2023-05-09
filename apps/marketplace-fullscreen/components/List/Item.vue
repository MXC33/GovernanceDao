<template lang="pug">
VList(justify="center" items="center" aspect="2/3" bg="black opacity-40")
  div(aspect="square" w="full")
    div(pos="relative" w="full" h="full")
      TokenVideo(:token="token" v-if="displayVideo" w="full" h="full" :is-large="true" pos="absolute" inset="0" object="cover center" bg="black" :key="getTokenKey(token)")
      TokenImage(:token="token" v-else w="full" h="full"  pos="absolute" inset="0" :is-large="true" p="4 lg:8" :key="getTokenKey(token) + 'image'")

  VList(w="full" flex-grow="1" font="bold" items="start" bg="gray-900" :invalid="isInvalid" p="6")
    slot(v-if="$slots.default")
    TokenName(:token="token" text="xl ellipsis" font="bold")
    div(text="lg") 0.12ETH

</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/../../layers/ix-base/composables/useTokens'

const { getTokenKey } = useTokens()
const displayVideo = computed(() => {
  switch (props.token.type) {
    case 'pix':
    case 'astro-gold':
    case 'astro-gold-lite':
    case 'tile-contract':
    case 'raffle-ticket':
    case 'nothing':
    case 'rover':
    case 'avatar':
    case 'gg':
      return false
    default:
      return true
  }
})

const props = defineProps<{
  token: TokenIdentifier,
  quantity?: number,
  isInvalid?: boolean,
  isActive?: boolean,
}>()

</script>