<template lang="pug">
HList(items="center" space-x="2" font="bold" cursor="pointer" w="full")
  TokenImage(:token="token" w="10 md:16" h="10 md:16"  :key="getTokenKey(token)" pos="relative" z="1")

  Transition(name="slide-left" mode="out-in")
    HList(v-if="!hideName" space-x="2" min-w="0")
      TokenName(:token="token" capitalize="~" :key="getTokenKey(token)")

      slot
    div(w="0" v-else)

</template>

<script setup lang="ts">
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
const { getTokenKey } = useTokens()

const { token } = defineProps<{
  token: AnyToken,
  hideName?: boolean
}>()

</script>