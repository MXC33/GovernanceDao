<template lang="pug">
VList(bg="gray-800" v-if="item" frame="~" flex-shrink="0")
  HList(justify="start"  @click="isOpen = !isOpen" cursor="pointer")
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

  Collapse(:when="isOpen" class="v-collapse")
    VList(p="6" space-y="3" w="full")
      VList(space-y="1")
        ListingPriceRow()
          template(#name) Floor Price
          template(#value) 
            Currency(:value="item.token.sale_price")

        ListingPriceRow()
          template(#name) Best offer
          template(#value) 
            Currency(:value="item.token.higher_bid_price")

      ListingAdjustRow()
        template(#header) Price

        template(#value)
          InputText(v-model="item.ixtPrice")
            template(#suffix) IXT

        template(#action)
          div(btn="~" w="full" h="30" cursor="pointer" cut="bottom-right b-gray-400 hover:b-gray-200") Floor

      ListingAdjustRow()
        template(#header) Quantity

        template(#value)
          Adjustable(v-model="item.shares" h="full")

        template(#action)
          button(btn="~ form" w="full") Max

      HList()

</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'
import { Collapse } from 'vue-collapsed'

const item = defineModel<ListingItem>()
const isOpen = ref(false)
</script>
  