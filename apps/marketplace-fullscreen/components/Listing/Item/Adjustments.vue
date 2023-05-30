<template lang="pug">
VList(space-y="3" v-if="item")

  ListingAdjustRow()
    template(#header) Price

    template(#value)
      InputText(v-model="item.ixtPrice")
        template(#suffix) IXT

      ListingItemDetail() Total list price {{ listPrice }}

    template(#action)
      button(btn="~ form" w="full" @click="onClickFloor") Floor

  ListingAdjustRow()
    template(#header) Quantity

    template(#value)
      Adjustable(v-model="item.shares" h="10")
      ListingItemDetail() You own {{ item.token.my_shares }}

    template(#action)
      button(btn="~ form" w="full" @click="onClickMax") Max

  ListingAdjustRow()
    template(#header) Duration

    template(#value)
      div(grid="~ cols-4 gap-3")
        button(btn="~ form on-active:form-active" v-for="dayCount in days" capitalize="~" :active="item.durationInDays == dayCount" @click="selectDays(dayCount)") {{ formattedDays(dayCount) }}

</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'

const item = defineModel<ListingItem>()

const days = [1, 3, 7, 30, 91, 183]

const { formattedDays } = useListingDuration()

const selectDays = (days: number) => {
  if (!item.value)
    return

  item.value.durationInDays = days
}

const listPrice = computed(() => roundToDecimals((item.value?.ixtPrice ?? 0) * (item.value?.shares?.value ?? 0), 2))

const onClickMax = () => {
  if (!item.value)
    return

  item.value.shares.value = item.value.token.my_shares
}

const onClickFloor = () => {
  if (!item.value)
    return

  item.value.ixtPrice = item.value.token.sale_price
}
</script>
  