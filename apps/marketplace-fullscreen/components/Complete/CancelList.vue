<template lang="pug">
VList(space-y="3")
  TransactionItemCancel(v-for="item in items" :token="item")
    template(#detail)
      slot(name="detail" :item="item.sale.quantity")
  
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import type { UnlistingItem } from 'composables/useListing';

const { items } = defineProps<{
  items: UnlistingItem[]
}>()
</script>

<style></style>