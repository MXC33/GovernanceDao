<template lang="pug">
VList(justify="center" items="center" aspect="4/5" w="50%" bg="black opacity-40")

  div(aspect="square" w="full")
    div(pos="relative" w="full" h="full")
      TokenVideo(:token="token" v-if="displayVideo" w="full" h="full" :is-large="true" pos="absolute" inset="0" object="cover center" bg="black" :key="getTokenKey(token)")
      TokenImage(:token="token" v-else w="full" h="full"  pos="absolute" inset="0" :is-large="true" p="4 lg:8" :key="getTokenKey(token) + 'image'")

  VList(justify="center" w="full" flex-grow="1" font="bold" items="center" bg="mc-mint on-invalid:(mc-orange opacity-40) opacity-40" :invalid="isInvalid")
    slot(v-if="$slots.default")
    TokenNameWithQuantity(:token="token" :quantity="quantity" v-else)

</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/useTokens';

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