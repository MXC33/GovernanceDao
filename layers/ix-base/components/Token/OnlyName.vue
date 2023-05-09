<template lang="pug">
div(uppercase="~") {{ name }} 
</template>

<script lang="ts" setup>
import type { TokenIdentifier } from '~/composables/useTokens';
const { getTokenName } = useTokens()

const props = defineProps<{
  token: TokenIdentifier,
  isShort?: boolean
}>()

const name = computed(() => {
  if (smallName.value)
    return smallName.value

  return getTokenName(props.token)
})

const smallName = computed(() => {
  if (!props.isShort)
    return null

  switch (props.token.type) {
    case 'astro-credit': return 'ACRED'
    case 'astro-gold': return 'AGOLD'
    case 'astro-gold-lite': return 'ALITE'
    case 'metashare': return 'METASHARE'
  }
})



</script>
