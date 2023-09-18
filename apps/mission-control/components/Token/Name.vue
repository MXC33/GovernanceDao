<template lang="pug">
div(uppercase="~" text="ellipsis" w="[calc(100%)]" whitespace="nowrap" v-if="!noOverflow") {{ name }} 
div(uppercase="~" v-else) {{ name }} 
</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const props = defineProps<{
  token: NftFragment,
  isShort?: boolean,
  noOverflow?: boolean,
  noChainName?: boolean
}>()

const type = computed(() => props.token.tokenInfo?.type)

const name = computed(() => {
  if (smallName.value) {
    return smallName.value
  }

  if (props.token.tokenInfo?.type == 'nothing')
    return "Nothing"

  return props.token.tokenInfo?.title ?? "No Name"
})

const smallName = computed(() => {
  if (!props.isShort)
    return null

  switch (type.value) {
    case 'astro-credit': return 'ASTRO'
    case 'astro-gold': return 'AGOLD'
    case 'astro-gold-lite': return 'ALITE'
    case 'metashare': return 'METASHARE'
    default:
      return name.value
  }
})



</script>
