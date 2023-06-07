<template lang="pug">
TransactionItemAdjustRow(v-if="item")
  template(#header) Quantity

  template(#value)
    Adjustable(v-model="item.shares" h="10"  :is-neutral="false")
    TransactionItemAdjustDetail() 
      slot(name="max" :max="item.shares.max") You own {{ item.shares.max }}

  template(#action v-if="item.shares.max")
    button(btn="~ form" w="full" @click="onClickMax") Max

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
