<template lang="pug">
ContentDrawer(frame="none" mb="4" b="t-1 b-1 gray-600" :is-neutral="true")
  template(#header) {{ $t(`marketplace.transactions.applyToAll`) }}
  template(#default)
    TransactionApplyToAllAdjustment()
      template(#header) {{ $t(`collection.attributes.floorPrice`) }}
      template(#button) {{ $t(`marketplace.transactions.setToFloor`) }}

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions';

defineModel<TransactionItem[]>()

</script>