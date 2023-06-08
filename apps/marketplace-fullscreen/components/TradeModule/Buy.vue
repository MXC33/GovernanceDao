<template lang="pug">
VList()
  TradeModuleHeader(v-model="shares" :ixt="isSubstituteListing ? totalMaxPrice : totalPrice" :disabled="isDisabled")
    template(#title v-if="isSubstituteListing") Total Price
    template(#title v-else) Max Price
    template(#adjust v-if="item.nft_type === NFTType.ERC1155")
      TradeModuleHeaderAdjust(v-model="shares")
        template(#error v-if="showIncreaseMaxPrice") Try increasing your max price to buy more items

  TradeModuleAverage(v-if="shares.value > 1")
    template(#title) Avg. price per unit
    template(#ixt) {{averagePricePerItem}} IXT
    template(#percentage) {{aboveFloorPrice}}% above floor price

  TradeModuleSubstitute(v-model="isSubstituteListing")
    template(#title) Substitute listings
    template(#substituteTitle) Max price per listing
    template(#substituteInput) 
      InputText(v-model="maxPrice" :class="{highlighted: showIncreaseMaxPrice}")
        template(#suffix) IXT

  div(grid="~ cols-2 on-one-col:cols-1" text="xs md:base" :one-col="isSubstituteListing")
    ButtonInteractive(btn="~ secondary" font="bold" @click="onClickOffer" text="Make offer" v-if="!isSubstituteListing")

    ButtonInteractive(btn="~ primary" font="bold" @click="buyItems" v-if="!isDisabled" :text="`Buy ${shares?.value} item`" :loading="isBuyLoading")

    ButtonInteractive(btn="~ primary" bg="on-disabled:gray-700" color="on-disabled:gray-400" cursor="default" font="bold" :disabled="isDisabled" text="There is no sales" v-else)

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken';
import { useBuyContract, useBuyItems } from "~/composables/useBuy";
import { NFTType } from "~/composables/useAssetContracts";

const { displayPopup } = usePopups()

const { execute: buyItems, loading: isBuyLoading } = useContractRequest(() => buy(), {
  error: () => ({
    title: "Error purchasing"
  })
})

const { item, isDisabled } = defineProps<{
  ownerValue?: string | number,
  item: SingleItemData
  isDisabled?: boolean
}>()

const onClickOffer = () => {
  displayPopup({
    type: 'bid-item',
    items: [item]
  })
}

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
} = useBuyItems(item)

const { buySingleItem } = useBuyContract()

const buy = async () => {
  const price = !isSubstituteListing ? totalPrice.value : totalMaxPrice.value
  const quantity = shares.value.value

  const sale = await buySingleItem(
    selectedSalesToBuy.value,
    price,
    quantity,
    isSubstituteListing.value
  )

  if (sale)
    displayPopup({
      type: 'buy-items-success',
      items: [{
        token: item,
        shares: shares.value,
        ixtPrice: price
      }]
    })

  console.log('checkoutSales', sale)
}

console.log(aboveFloorPrice.value)
</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(246, 186, 30, 0.75);
}
</style>
