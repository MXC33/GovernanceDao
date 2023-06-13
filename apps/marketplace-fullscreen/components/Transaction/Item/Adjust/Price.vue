<template lang="pug">
TransactionItemAdjustRow(v-if="item")
  template(#header) {{ $t(`marketplace.transactions.price`) }}

  template(#value)
    InputText(v-model="item.ixtPrice")
      template(#suffix) IXT

    TransactionItemAdjustDetail() {{ $t(`marketplace.transactions.total`) }} {{item.type}} {{ $t(`marketplace.transactions.price`) }} {{ listPrice }}

  template(#action)
    button(btn="~ form" w="full" @click="onClickFloor") {{ $t(`marketplace.transactions.floor`) }} 

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'

const item = defineModel<TransactionItem>()

const listPrice = computed(() => roundToDecimals((item.value?.ixtPrice ?? 0) * (item.value?.shares?.value ?? 0), 2))

const onClickFloor = () => {
  if (!item.value)
    return

  item.value.ixtPrice = item.value.token.sale_price
}
</script>
  