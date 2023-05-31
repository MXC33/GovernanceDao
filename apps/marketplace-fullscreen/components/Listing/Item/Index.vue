<template lang="pug">
VList(bg="gray-800" v-if="item" frame="~" flex-shrink="0")
  HList(justify="start"  @click="isOpen = !isOpen" cursor="pointer" pr="6")
    VList(w="30" h="30" pos="relative" min-h="0")
      TokenImage(:token="item.token" pos="absolute" inset="0" h="full" w="full")

    VList(w="full" p="6")
      HList(space-x="3" font="bold")
        TokenName(:token="item.token" w="auto")
        span x{{ item.shares.value }}

      ListingItemDescription(:item="item")

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

      ListingItemAdjustments(v-model="item")

      HList()

</template>
  
<script lang="ts" setup>
import type { ListingItem } from '~/composables/useListing'
import CheckMarkIcon from '~/assets/icons/checkmark-green.svg'
import { Collapse } from 'vue-collapsed'

const item = defineModel<ListingItem>()
const isOpen = ref(false)

const isValid = computed(() => !!item.value?.ixtPrice && !!item.value.shares)

</script>
  