<template lang="pug">
VList(bg="gray-800" v-if="item" frame="~" flex-shrink="0")
  HList(justify="start"  @click="isOpen = !isOpen" cursor="pointer")
    TokenImage(:token="item.token" w="30" h="30")

    VList(w="full" p="6")
      TokenName(:token="item.token")
      div Price not set
      div Time not set


  Collapse(:when="isOpen" class="v-collapse")
    VList(p="6" space-y="3" w="full")
      ListingPriceRow()
        template(#name) Floor Price
        template(#value) 15 IXT

      ListingPriceRow()
        template(#name) Best offer
        template(#value) 15 IXT

      ListingAdjustRow()
        template(#header) Price

        template(#value)
          InputText(v-model="item.ixtPrice")

        template(#action)
          button(btn="~ form" w="full") Floor

      ListingAdjustRow()
        template(#header) Quantity

        template(#value)
          Adjustable(v-model="item.shares" h="full")

        template(#action)
          button(btn="~ form" w="full") Floor

      HList()

</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'
import { Collapse } from 'vue-collapsed'

const item = defineModel<ListingItem>()
const isOpen = ref(false)
</script>
  