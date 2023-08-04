<template lang="pug">
div(text="ellipsis" w="[calc(100%)]" whitespace="nowrap" v-if="!noOverflow" :max-w="contextWidth") {{ name }} 
div(v-else) {{ name }} 
</template>

<script lang="ts" setup>
import type { CollectionContext } from '@ix/marketplace/composables/useCollection';
import type { AnyToken } from '~/composables/Token/useTokens';

const props = defineProps<{
  context?: CollectionContext
  token: AnyToken,
  isShort?: boolean,
  noOverflow?: boolean,
  noChainName?: boolean
}>()

const fullName = await useTokenName(props.token, props.noChainName)

const name = computed(() => {

  if (smallName.value)
    return smallName.value

  return fullName
})

const smallName = computed(() => {
  if (!props.isShort || isIXToken(props.token))
    return null

  switch (props.token.type) {
    case 'astro-credit': return 'ASTRO'
    case 'astro-gold': return 'AGOLD'
    case 'astro-gold-lite': return 'ALITE'
    case 'metashare': return 'METASHARE'
  }
})

const contextWidth = computed(() => {
  if (props.context != 'collection')
    return 'lt-md:20'

  else
    return 'lt-md:50;'

})

</script>
