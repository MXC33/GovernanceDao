<template lang="pug">
HList(v-if="isCollection" items="center" space-x="2" font="bold" cursor="pointer" w="full")
  div(w="12" h="12")
    TokenImage(:token="token" w="12" h="12" :key="getTokenKey(token)")
  TokenName(:token="token" capitalize="~" :key="getTokenKey(token)" :context="context")

  slot

HList(v-else items="center" space-x="2" font="bold" cursor="pointer" max-w="60")
  div(w="12" h="12")
    TokenImage(:token="token" w="12" h="12" :key="getTokenKey(token)")
  TokenName(:token="token" capitalize="~" :key="getTokenKey(token)" :context="context")
    slot
  
</template>

<script setup lang="ts">
import type { AnyToken } from '@ix/base/composables/Token/useTokens';
import type { CollectionContext } from '~/composables/useCollection';
const { getTokenKey } = useTokens()

const { context, token } = defineProps<{
  token: AnyToken
  context?: CollectionContext
}>()

const isCollection = computed(() => context == 'collection')

</script>