<template lang="pug">
HList(items="center" space-x="2" font="bold" cursor="pointer" w="full")
  TokenImage(:token="token" w="10 lg:16" h="10 lg:16"  :key="getTokenKey(token)")

  TokenName(:token="token" capitalize="~" :key="getTokenKey(token)")

  slot

</template>

<script setup lang="ts">
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
const { getTokenKey } = useTokens()

const { token } = defineProps<{
  token: AnyToken
}>()

</script>