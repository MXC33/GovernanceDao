<template lang="pug">
VList(p="x-3 y-2" b="1 $mc-accent-40" items="center" pos="relative" color="$corporation-text-color" uppercase="~" font="bold" aspect="square" min-h="0") 
  div(v-if="!text" p="x-3 y-2" b="l-1 b-1 $mc-accent-40" pos="absolute right-0 top-0") {{ balance }}

  TokenImage(:token="token" :isLarge="false" object="contain" max-w="20" min-h="0" flex="~ col")

  div(self="start") {{description}}

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql'

const description = computed(() => {
  const { text, token } = props
  if (text)
    return text

  const defaultText = `${token.type ?? ''} ${token.tier ?? ''}`
  return (token.type == 'raffle-ticket') ? `raffle ${defaultText}` : defaultText
})

const props = defineProps<{
  text?: string
  token?: NftFragment
  balance?: number
}>()
</script>