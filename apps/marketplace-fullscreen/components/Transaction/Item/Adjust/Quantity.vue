<template lang="pug">
TransactionItemAdjustRow(v-if="item")
  template(#header) Quantity

  template(#value)
    Adjustable(v-model="item.shares" h="10")
    TransactionItemAdjustDetail() You own {{ item.token.my_shares }}

  template(#action)
    button(btn="~ form" w="full" @click="onClickMax") Max

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'

const item = defineModel<TransactionItem>()

const onClickMax = () => {
  if (!item.value)
    return

  item.value.shares.value = item.value.token.my_shares
}
</script>
  