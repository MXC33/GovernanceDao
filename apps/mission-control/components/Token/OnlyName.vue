<template lang="pug">
div(uppercase="~") {{ name }} 
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const props = defineProps<{
  token: NftFragment,
  isShort?: boolean
}>()

const name = computed(() => {
  if (smallName.value)
    return smallName.value

  return props.token.tokenInfo.title
})

const smallName = computed(() => {
  if (!props.isShort)
    return null

  switch (props.token.tokenInfo.type) {
    case 'astro-credit': return 'ACRED'
    case 'astro-gold': return 'AGOLD'
    case 'astro-gold-lite': return 'ALITE'
    case 'metashare': return 'METASHARE'
  }
})



</script>
