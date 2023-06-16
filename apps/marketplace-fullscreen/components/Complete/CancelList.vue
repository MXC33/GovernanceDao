<template lang="pug">
VList(space-y="3")
  TransactionItemCancel(v-for="item in items" :token="item")
    template(#detail)
      slot(name="detail" :item="item")
  
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'

const { items } = defineProps<{
  items: IXToken[]
}>()
</script>

<style></style>