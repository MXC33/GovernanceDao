<template lang="pug">
VList(space-y="1" v-if="item")
  TransactionItemDetailsRow()
    template(#name) {{ $t(`collection.attributes.floorPrice`) }}
    template(#value)
      Currency(:value="item.token?.sale_price")

  TransactionItemDetailsRow()
    template(#name) {{ $t(`collection.attributes.sale_price`) }}
    template(#value) 
      Currency(:value="item.token?.higher_bid_price")

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'

const { item } = defineProps<{ item: TransactionItem }>()

</script>
  