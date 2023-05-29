<template lang="pug">
VList(bg="gray-800" v-if="item" frame="~" flex-shrink="0")
  HList(justify="start"  @click="isOpen = !isOpen" cursor="pointer" pr="6")
    VList(w="30" h="30" pos="relative" min-h="0")
      TokenImage(:token="item.token" pos="absolute" inset="0" h="full" w="full")

    VList(w="full" p="6")
      HList(space-x="3" font="bold")
        TokenName(:token="item.token" w="auto")
        span x{{ item.shares.value }}

      VList(text="sm")
        div
          span(v-if="!item.ixtPrice" color="semantic-warning") Price not set
          span(v-else font="bold") {{ item.ixtPrice }} IXT 

        div 
          span(v-if="!item.durationInDays" color="semantic-warning") Time not set
          span(v-else font="bold") {{ item.durationInDays }} Days 

    HList(space-x="6")
      CheckMarkIcon(opacity="0 on-valid:100" transition="all" :valid="isValid" w="6")

      HelperChevron(w="5" :up="isOpen")


  Collapse(:when="isOpen" class="v-collapse")
    VList(p="6" w="full" space-y="6")
      VList(space-y="1")
        ListingPriceRow()
          template(#name) Floor Price
          template(#value) 
            Currency(:value="item.token.sale_price")

        ListingPriceRow()
          template(#name) Best offer
          template(#value) 
            Currency(:value="item.token.higher_bid_price")

      div(b="t-1 gray-600")

      VList(space-y="3" )

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
            button(btn="~ form" v-for="dayCount in days") {{ formattedDays(dayCount) }}

          template(#action)
            button(btn="~ form" w="full" @click="onClickMax") Max

      HList()

</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'
import CheckMarkIcon from '~/assets/icons/checkmark-green.svg'
import { Collapse } from 'vue-collapsed'
import { formatDuration } from 'date-fns'

const item = defineModel<ListingItem>()
const isOpen = ref(false)

const days = [1, 3, 7, 30, 91, 183]

const formattedDays = (days: number) => formatDuration({ days }, { format: ['months', 'weeks', 'days'] })

const isValid = computed(() => !!item.value?.ixtPrice && !!item.value.shares)

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
  