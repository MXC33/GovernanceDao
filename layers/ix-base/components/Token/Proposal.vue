<template lang="pug">
TokenPicker(:token="token" :is-active="isActive" :is-invalid="notAvailable")
  TokenNameWithQuantity(:token="token", :quantity="quantity")

  slot
  
</template>

<script setup lang="ts">
import type { TokenIdentifier } from '~/composables/useTokens';

defineProps<{
  token: TokenIdentifier,
  quantity?: number,
  isActive: boolean,
  notAvailable?: boolean
}>()

</script>
