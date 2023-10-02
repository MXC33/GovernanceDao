<template lang="pug">
div(flex="~ row" justify="center" space-x="2")
  div {{ orderItem.value }}

</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';

defineProps<{
  orderItem: CorporationPaymentToken
}>();

</script>
