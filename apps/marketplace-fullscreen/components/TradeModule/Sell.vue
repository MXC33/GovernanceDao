<template lang="pug">
VList()
  TradeModuleHeader(v-model="shares" :ixt="isSubstituteOffering ? totalMinOffer : totalOffer" :disabled="isDisabled")
    template(#title v-if="shares.value > 1") Total offer amount
    template(#title v-else) Highest Offer
    template(#adjust v-if="item.nft_type === NFTType.ERC1155")
      TradeModuleHeaderAdjust(v-model="shares")
        template(#error v-if="showDecreaseMinPrice") Try decreasing your lowest offer per unit to accept more items

  TradeModuleAverage(v-if="shares.value > 1")
    template(#title) Avg. offer per unit
    template(#ixt) {{averageOfferPerItem}} IXT
    template(#percentage) {{belowHighestOffer}}% below highest offer

  TradeModuleSubstitute(v-model="isSubstituteOffering")
    template(#title) Substitute offers
    template(#substituteTitle) Lowest offer per unit
    template(#substituteInput) 
      InputText(v-model="minOffer" :class="{highlighted: showDecreaseMinPrice}")
        template(#suffix) IXT

  div(grid="~ cols-2" text="xs md:base")
    ButtonInteractive(btn="~ secondary" font="bold" @click="onClickSell" text="List item")

    ButtonInteractive(btn="~ primary " font="bold" @click="acceptItems" v-if="!isDisabled" :text="`Accept ${shares?.value} offer`" :loading="isAcceptLoading")

    ButtonInteractive(btn="~ primary" bg="on-disabled:gray-700" color="on-disabled:gray-400" cursor="default" font="bold" :disabled="isDisabled" text="You have no offers" v-else)

</template>

<script lang="ts" setup>
import type { SingleItemData } from "@ix/base/composables/Token/useIXToken";
import { useOfferContract, useOfferItems } from "~/composables/useOffer";
import { NFTType } from "~/composables/useAssetContracts";

const { displayPopup } = usePopups()
const { item, isDisabled } = defineProps<{
  item: SingleItemData
  isDisabled?: boolean
}>()

const onClickSell = () => {
  displayPopup({
    type: 'list-item',
    items: [item]
  })
}

const {
  isSubstituteOffering,
  shares,
  minOffer,
  selectedBidsToAccept,
  totalOffer,
  totalMinOffer,
  averageOfferPerItem,
  belowHighestOffer,
  showDecreaseMinPrice
} = useOfferItems(item)

const { acceptOffers } = useOfferContract()

const accept = async () => {
  const totalOfferPrice = !isSubstituteOffering ? totalOffer.value : totalMinOffer.value
  const quantity = shares.value.value

  const acceptOffer = await acceptOffers(
    selectedBidsToAccept.value,
    totalOfferPrice,
    quantity
  )

  if (acceptOffer)
    displayPopup({
      type: 'accept-items-success',
      item: {
        token: item,
        shares: shares.value,
        ixtPrice: totalOfferPrice
      }
    })

  console.log('checkoutSales', acceptOffer)
}

const { execute: acceptItems, loading: isAcceptLoading } = useContractRequest(() => accept(), {
  error: () => ({
    title: 'Error processing your purchase',
  })
})

</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(246, 186, 30, 0.75);
}
</style>
