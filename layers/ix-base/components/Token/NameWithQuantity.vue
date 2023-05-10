<template lang="pug">
HList(items="center" justify="center" uppercase="~" w="full" space-x="2" px="2") 
  span(v-if="isNothing")
  span(v-else-if="quantity") x{{ quantity }} 
  HList(w="full") 
    TokenName(:token="token")
    div {{ pluralize }} 
  
</template>

<script setup lang="ts">
import type { TokenIdentifier } from '~/composables/Token/useTokens';

const props = defineProps<{
  token: TokenIdentifier,
  quantity?: number,
}>()

const isNothing = computed(() => props.token.type == 'nothing')
const pluralize = usePlural(props.quantity, props.token.type)
</script>
