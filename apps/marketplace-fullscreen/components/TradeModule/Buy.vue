<template lang="pug">
VList()
  HList(px="6" py="8" space-y="2" items="start")
    div(grow="1" w="full")
      template(v-if="!isSubstituteListing")
        span(color="gray-200") Total Price
        HList(items="end" space-x="3" )
          span(color="white" font="bold" text="4xl") {{totalPrice}} IXT
          span(color="gray-200" font="bold" text="lg") ${{ ixtToUSD(totalPrice) }}
      template(v-else)
        span(color="gray-200") Max Price
        HList(items="end" space-x="3" )
          span(color="white" font="bold" text="4xl") {{totalMaxPrice}} IXT
          span(color="gray-200" font="bold" text="lg") ${{ ixtToUSD(totalMaxPrice) }}

      div(v-if="shares.value > 1" )
        span(color="gray-200" m="t-10") Avg. price per unit
        HList(items="end" space-x="3")
          span(color="white" font="bold") {{averagePricePerItem}} IXT
          span(color="yellow-200") {{aboveFloorPrice}}% above floor price

    //- SAVE BELOW FOR FUTURE NEED
    //- HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
    //- InputCheckbox(v-model="maxPrice")
    //-   span(color="gray-200") Max price per listing


    VList(justify="end" space-y="3")
      Adjustable(v-model="shares" h="full" :is-neutral="true")
      span(color="yellow-200" v-if="showIncreaseMaxPrice" ) Try increasing your max price to buy more items

  HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center" justify="between")
    InputCheckbox(v-model="isSubstituteListing")
      span(color="gray-200") Substitute listings
    HList( space-x="3" items="center" v-if="isSubstituteListing")
      span(color="white") Max price per listing
      InputText(v-model="maxPrice" :class="{highlighted: showIncreaseMaxPrice}")
        template(#suffix) IXT

  div(grid="~ cols-2" text="base")
    button(btn="~ secondary" font="bold") Make offer
    button(btn="~ primary" font="bold" @click="buy") Buy {{shares.value}} item

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';
import { useBuyContract, useBuyItems } from "~/composables/useBuy";

const { ixtToUSD } = useIXTPrice()
const props = defineProps<{
  ownerValue?: string | number,
  item: SingleItemData
}>()
const {
  isSubstituteListing,
  shares,
  maxPrice,
  selectedSalesToBuy,
  totalPrice,
  totalMaxPrice,
  averagePricePerItem,
  aboveFloorPrice,
  showIncreaseMaxPrice
} = useBuyItems(props.item)

const { checkoutSales } = useBuyContract()

const buy = async () => {
  console.log('checkoutSales', await checkoutSales(
    selectedSalesToBuy.value,
    !isSubstituteListing ? totalPrice.value : totalMaxPrice.value,
    shares.value.value
  ))
}

</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(246, 186, 30, 0.75);
}
</style>
