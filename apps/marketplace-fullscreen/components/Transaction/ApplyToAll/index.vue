<template lang="pug">
ContentDrawer(frame="none" mb="4" b="t-1 b-1 gray-600" :is-neutral="true")
  template(#header) APPLY TO ALL
  template(#default)
    TransactionApplyToAllAdjustment()
      template(#header) Floor price
      template(#button) Set to Floor

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions';

defineModel<TransactionItem[]>()

</script>