<template lang="pug">
TransactionItemAdjustRow(v-if="item")
  template(#header) {{ item.type }}  {{ $t(`marketplace.transactions.duration`) }}

  template(#value)
    div(grid="~ cols-4 gap-3")
      button(btn="~ form on-active:form-active" v-for="dayCount in days" capitalize="~" :active="item.durationInDays == dayCount" @click="selectDays(dayCount)") {{ formattedDays(dayCount) }}

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'

const item = defineModel<TransactionItem>()

const days = TransactionDays

const { formattedDays } = useTransactions()

const selectDays = (days: number) => {
  if (!item.value)
    return

  item.value.durationInDays = days
}

</script>
  