<template lang="pug">
div(uppercase="~" text="ellipsis" w="[calc(100%)]" whitespace="nowrap" v-if="!noOverflow") {{ name }} 
div(uppercase="~" v-else) {{ name }} 
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/useTokens';
const { getTokenName } = useTokens()

const props = defineProps<{
  token: TokenIdentifier,
  isShort?: boolean,
  noOverflow?: boolean,
  noChainName?: boolean
}>()

const { execute: fetchTokenData } = useTokenInfo(props.token)
await fetchTokenData()

const name = computed(() => {
  if (smallName.value)
    return smallName.value

  return getTokenName(props.token, !props.noChainName)
})

const smallName = computed(() => {
  if (!props.isShort)
    return null

  switch (props.token.type) {
    case 'astro-credit': return 'ASTRO'
    case 'astro-gold': return 'AGOLD'
    case 'astro-gold-lite': return 'ALITE'
    case 'metashare': return 'METASHARE'
  }
})



</script>
