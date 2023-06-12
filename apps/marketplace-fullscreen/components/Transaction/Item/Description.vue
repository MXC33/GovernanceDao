<template lang="pug">
VList(text="sm")
  div
    span(v-if="isInvalid" color="semantic-warning") Price not set
    GlitchText(v-else :text="String(item.ixtPrice)" font="bold" suffix=" IXT")

  div(v-if="item.type != 'accept'" )
    span(v-if="!item.durationInDays" color="semantic-warning") Time not set
    GlitchText(v-else font="bold" capitalize="~" :text="formattedDays(item.durationInDays)")

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions'
const { item } = defineProps<{ item: TransactionItem }>()
const { formattedDays, itemIsInvalid } = useTransactions()
const isInvalid = computed(() => itemIsInvalid(item))
</script>
