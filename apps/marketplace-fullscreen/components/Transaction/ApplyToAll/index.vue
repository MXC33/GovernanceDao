<template lang="pug">
ContentDrawer(frame="none" mb="4" b="t-1 b-1 gray-600" :is-neutral="true" mx="-6")
  template(#header) {{ $t(`marketplace.transactions.applyToAll`) }}
  template(#default)
    VList(p="6" space-y="6")
      TransactionItemAdjustRow()
        template(#header) {{ $t(`collection.attributes.floorPrice`) }}
        template(#value)
          div(grid="~ cols-4 gap-3")
            button(btn="~ form on-active:form-active" :active="allSetToFloor" capitalize="~" @click="onClickSetToFloor" disable="on-disabled:active" :disabled="floorDisabled" grid="lt-md:col-span-4") {{ $t(`marketplace.transactions.setToFloor`) }}

      TransactionItemAdjustRow()
        template(#header) {{ $t(`marketplace.transactions.duration`) }}
        template(#value)
          div(grid="~ cols-4 gap-3")
            button(btn="~ form on-active:form-active" v-for="dayCount in days" capitalize="~" :active="activeDays == dayCount" @click="onClickSetDuration(dayCount)") {{ formattedDays(dayCount) }}

</template>

<script lang="ts" setup>
import type { TransactionItem } from '~/composables/useTransactions';

const days = TransactionDays
const { formattedDays } = useTransactions()

const activeDays = computed(() => {
  const days = items.value?.map((item) =>
    item.durationInDays
  )
  return allElementsEqual(days) ?? -1
})

const allSetToFloor = computed(() => {
  const prices = items.value?.map((item) =>
    item.ixtPrice == item.token.sale_price
  )
  console.log("PRICES", prices)
  return allElementsEqual(prices)
})

const items = defineModel<TransactionItem[]>()

const floorDisabled = computed(() =>
  items.value?.every((item) => !item.token.sale_price)
)

const onClickSetDuration = (days: number) => {
  if (!items.value)
    return

  items.value = items.value?.map((item) => {
    return {
      ...item,
      durationInDays: days
    }
  })
}


const onClickSetToFloor = () => {
  if (!items.value)
    return

  items.value = items.value?.map((item) => {
    return {
      ...item,
      ixtPrice: item.token.sale_price
    }
  })
}
</script>