<template lang="pug">
TransactionItemStatic(:item="item" v-if="item")
  template(#description)
    TransactionItemDetails(:item="item")

</template>

<script lang="ts" setup>
import type { RejectionItem } from "~/composables/useOffer";

const { item } = defineProps<{
  item?: RejectionItem
}>()
</script>
