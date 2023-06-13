<template lang="pug">
TransactionItemAdjustRow(v-if="item")
  template(#header) {{ $t(`marketplace.transactions.quantity`) }}

  template(#value)
    Adjustable(v-model="item.shares" h="10"  :is-neutral="false")
    TransactionItemAdjustDetail() 
      slot(name="max" :max="item.shares.max") {{ $t(`marketplace.transactions.youOwn`) }} {{ item.shares.max }}

  template(#action v-if="item.shares.max")
    button(btn="~ form" w="full" @click="onClickMax") {{ $t(`marketplace.transactions.max`) }}

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'
import { get } from '@vueuse/core'
const item = defineModel<TransactionItem>()

const onClickMax = () => {
  if (!item.value || !item.value.shares.max)
    return

  const maxValue = get(item.value.shares.max)
  item.value.shares.value = maxValue
}
</script>
