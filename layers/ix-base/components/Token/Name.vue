<template lang="pug">
div(uppercase="~" text="ellipsis" w="[calc(100%)]" whitespace="nowrap" v-if="!noOverflow") {{ name }} 
div(uppercase="~" v-else) {{ name }} 
</template>
  
<script lang="ts" setup>
import type { NftFragment } from '#gql'
import type { AnyToken } from '~/composables/Token/useTokens';

const { token, isShort } = defineProps<{
  token: AnyToken,
  isShort?: boolean,
  noOverflow?: boolean,
}>()

const name = computed(() => {
  if (isIXToken(token))
    return token.name

  const shortName = getShortName(token)
  if (isShort && shortName)
    return shortName

  if (token.tokenInfo?.type == 'nothing')
    return "Nothing"

  return token.tokenInfo?.title ?? "No Name"
})

const getShortName = (token: NftFragment) => {
  switch (token.tokenInfo?.type) {
    case 'astro-credit': return 'ASTRO'
    case 'astro-gold': return 'AGOLD'
    case 'astro-gold-lite': return 'ALITE'
    case 'metashare': return 'METASHARE'
    default:
      return null
  }
}

</script>