<template lang="pug">
InputGroup(v-if="item && isERC1155")
  template(#header) {{ $t(`marketplace.transactions.quantity`) }}

  template(#value)
    Adjustable(v-model="item.shares" h="10" look="frame")
    TransactionItemAdjustDetail() 
      slot(name="max" :max="item.shares.max") {{ $t(`marketplace.transactions.youOwn`) }} {{ item.shares.max }}

  template(#action v-if="item.shares.max")
    button(btn="~ form" w="full" @click="onClickMax") {{ $t(`marketplace.transactions.max`) }}

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'
import { get } from '@vueuse/core'
const item = defineModel<TransactionItem>()

const isERC1155 = computed(() => {
  if (!item.value)
    return null
  return item.value.token.nft_type == 0
})

const onClickMax = () => {
  if (!item.value || !item.value.shares.max)
    return

  const maxValue = get(item.value.shares.max)
  item.value.shares.value = maxValue
}
</script>
