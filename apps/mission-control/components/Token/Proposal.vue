<template lang="pug">
TokenPicker(:token="token" :is-active="isActive" :is-invalid="notAvailable")
  TokenNameWithQuantity(:token="token", :quantity="quantity")

  slot
  
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

defineProps<{
  token: NftFragment,
  quantity?: number,
  isActive: boolean,
  notAvailable?: boolean
}>()

</script>
