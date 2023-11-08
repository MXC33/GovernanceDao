<template lang="pug">
VList()
  TradeModuleHeader(v-model="shares" :ixt="isSubstituteOffering ? totalMinOffer : totalOffer" :disabled="isDisabled")
    template(#title v-if="shares.value > 1") {{ $t(`marketplace.trade.totalOfferAmount`) }}
    template(#title v-else) {{ $t(`marketplace.trade.highestOffer`) }}
    template(#adjust v-if="item.nft_type === NFTType.ERC1155")
      TradeModuleHeaderAdjust(v-model="shares")
        template(#error v-if="showDecreaseMinPrice") {{ $t(`marketplace.trade.decreasingOffer`) }}

  TradeModuleAverage(v-if="shares.value > 1")
    template(#title) {{ $t(`marketplace.trade.averageOffer`) }}
    template(#ixt) {{averageOfferPerItem}} IXT
    template(#percentage) {{belowHighestOffer}}% {{ $t(`marketplace.trade.belowHighestOffer`) }}

  TradeModuleSubstitute(v-model="isSubstituteOffering")
    template(#title) {{ $t(`marketplace.trade.lowestOffer`) }}
    template(#substituteTitle)
    template(#information)
      HelperHover(tooltip-id="substituteSell" :maxWidth="85")
        InfoIcon(w="4.5" cursor="pointer" fill="gray-200 hover:white")
    template(#substituteInput)
      InputText(v-model="minOffer" :class="{highlighted: showDecreaseMinPrice}" :is-module="true")
        template(#suffix) IXT

  div(grid="~ cols-1 md:cols-2")
    ButtonInteractive(btn="~ secondary " font="bold" @click="acceptItems" v-if="!isDisabled" :text="`Accept ${shares?.value} offer`" :loading="isAcceptLoading")

    ButtonInteractive(btn="~ secondary" bg="on-disabled:gray-700" color="on-disabled:gray-400" cursor="default" font="bold" :disabled="isDisabled" text="You have no offers" v-else)

    ButtonInteractive(btn="~ primary" font="bold" @click="onClickSell" text="List item")


</template>

<script lang="ts" setup>
import type { SingleItemData } from "@ix/base/composables/Token/useIXToken";
import { useOfferContract, useOfferItems } from "~/composables/useOffer";
import { NFTType } from "~/composables/useAssetContracts";
import InfoIcon from '~/assets/icons/info-icon.svg'

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
    quantity,
    isSubstituteOffering.value
  )

  if (acceptOffer)
    displayPopup({
      type: 'accept-items-success',
      items: [{
        token: item,
        shares: shares.value,
        ixtPrice: totalOfferPrice
      }]
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
  box-shadow: 0px 0px 8px 1px rgba(249, 249, 249, 0.25);
}
</style>
