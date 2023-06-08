<template lang="pug">
HList(items="center" space-x="2" font="bold" cursor="pointer" max-w="60")
  div(w="12" h="12")
    TokenImage(:token="token" w="12" h="12" :key="getTokenKey(token)")
  TokenName(:token="token" capitalize="~" :key="getTokenKey(token)")

  slot
  
</template>

<script setup lang="ts">
import { AnyToken } from '@ix/base/composables/Token/useTokens';
const { getTokenKey } = useTokens()

defineProps<{
  token: AnyToken
}>()
</script>