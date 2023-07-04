<template lang="pug">
HList(v-if="isCollection" items="center" space-x="2" font="bold" cursor="pointer" flex-grow="1")
  div(w="12" h="12")
    TokenImage(:token="token" w="12" h="12" :key="getTokenKey(token)")
  TokenName(:token="token" capitalize="~" :key="getTokenKey(token)")

  slot

HList(v-else items="center" space-x="2" font="bold" cursor="pointer" max-w="60")
  div(w="12" h="12")
    TokenImage(:token="token" w="12" h="12" :key="getTokenKey(token)")
  TokenName(:token="token" capitalize="~" :key="getTokenKey(token)")

  slot
  
</template>

<script setup lang="ts">
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
import type { CollectionContext } from '~/composables/useCollection';
const { getTokenKey } = useTokens()

const { context } = defineProps<{
  token: AnyToken
  context?: CollectionContext
}>()

const isCollection = computed(() => context == 'collection')
</script>