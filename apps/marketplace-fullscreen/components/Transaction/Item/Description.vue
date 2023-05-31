<template lang="pug">
VList(text="sm")
  div
    span(v-if="!item.ixtPrice" color="semantic-warning") Price not set
    GlitchText(v-else :text="String(item.ixtPrice)" font="bold" suffix=" IXT")

  div 
    span(v-if="!item.durationInDays" color="semantic-warning") Time not set
    GlitchText(v-else font="bold" capitalize="~" :text="formattedDays(item.durationInDays)")

</template>
  
<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'
defineProps<{ item: TransactionItem }>()
const { formattedDays } = useTransactions()

</script>
  