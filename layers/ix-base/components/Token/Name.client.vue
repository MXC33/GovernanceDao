<template lang="pug">
div(uppercase="~" text="ellipsis" w="[calc(100%)]" whitespace="nowrap" v-if="!noOverflow") {{ name }} 
div(uppercase="~" v-else) {{ name }} 
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/Token/useTokens';
const { getTokenName } = useTokens()

const props = defineProps<{
  token: TokenIdentifier,
  isShort?: boolean,
  noOverflow?: boolean,
  noChainName?: boolean
}>()

const { execute: fetchTokenData, pending } = useTokenInfo(props.token)
await fetchTokenData()

const name = computed(() => {
  if (smallName.value)
    return smallName.value

  const name = getTokenName(props.token, !props.noChainName)

  console.log("Computed name", name)
  return name
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
