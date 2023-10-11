<template lang="pug">
VList()
  TradeModuleHeader(v-model="shares" :ixt="isSubstituteListing ? totalMaxPrice : totalPrice" :disabled="isDisabled")
    template(#title v-if="isSubstituteListing")  {{ $t(`marketplace.trade.maxPrice`) }}
    template(#title v-else) {{ $t(`marketplace.price.title`) }}
    template(#adjust v-if="item.nft_type === NFTType.ERC1155")
      TradeModuleHeaderAdjust(v-model="shares")
        template(#error v-if="showIncreaseMaxPrice") {{ $t(`marketplace.trade.increaseMaxPrice`) }}

  TradeModuleAverage(v-if="shares.value > 1")
    template(#title) {{ $t(`marketplace.trade.averagePrice`) }}
    template(#ixt) {{averagePricePerItem}} IXT
    template(#percentage) {{aboveFloorPrice}}% {{ $t(`marketplace.trade.aboveFloorPrice`) }}

  //- TradeModuleSubstitute(v-model="isSubstituteListing")
  //-   template(#title) {{ $t(`marketplace.trade.maxPriceList`) }}
  //-   template(#substituteTitle) 
  //-   template(#substituteInput) 
  //-     InputText(v-model="maxPrice" :class="{highlighted: showIncreaseMaxPrice}" :is-module="true")
  //-       template(#suffix) IXT

  div(grid="~ cols-1 md:cols-2 on-one-col:cols-1" :one-col="isSubstituteListing")
    ButtonInteractive(btn="~ secondary" font="bold" @click="onClickOffer" text="Make offer" v-if="!isSubstituteListing")

    HList(v-if="!isDisabled" pos="relative")
      ButtonInteractive(btn="~ primary" font="bold" @click="buyItems" :text="`Buy ${shares?.value} item`" :loading="isBuyLoading" pl="lt-md:20")
      HList(v-if="!isSubstituteListing" w="20" justify="center" cursor="pointer" @click="onClickCart" bg="ix-primary hover:(ix-ne)" b="l-1 gray-900")
        CartIcon(w="6")

    ButtonInteractive(btn="~ primary" bg="on-disabled:gray-700" color="on-disabled:gray-400" cursor="default" font="bold" :disabled="isDisabled" text="There are no sales" v-else)

</template>

<script lang="ts" setup>
import type { SingleItemData } from '@ix/base/composables/Token/useIXToken'
import { useBuyContract, useBuyItems } from "~/composables/useBuy"
import { NFTType } from "~/composables/useAssetContracts"
import CartIcon from '~/assets/icons/cart.svg'


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

const { addToCart } = useCart()

const onClickCart = () => {
  const specificSale = item.sales.reduce((minSale, currentSale) => {
    return currentSale.price < minSale.price ? currentSale : minSale
  }, item.sales[0])

  addToCart(item, specificSale)
}

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

}

</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(249, 249, 249, 0.25);
}
</style>
