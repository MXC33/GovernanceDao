<template lang="pug">
VList()
  HList(px="4 md:6" py="0 md:8" p="t-6 b-4" space-y="2" items="start")
    div(grow="1" w="full")
      span(color="gray-200" v-if="shares.value > 1" text="lt-md:xs") Total offer amount
      span(color="gray-200" v-else text="lt-md:xs") Highest offer
      template(v-if="!isSubstituteOffering")
        HList(items="center md:end" space-x="3")
          template(v-if="!isDisabled")
            span(color="white" font="bold" text="lg md:4xl") {{totalOffer}} IXT
            HList(translate-y="0.3")
              span(color="gray-200" font="bold" text="sm md:lg") ${{ ixtToUSD(totalOffer) }}
          template(v-else)
            span(color="white" font="bold" text="lg md:4xl") -- IXT
            HList(translate-y="0.3")
              span(color="gray-200" font="bold" text="sm md:lg") $ --

      template(v-else)
        HList(items="end" space-x="3")
          span(color="white" font="bold" text="lg md:4xl") {{totalMinOffer}} IXT
          span(color="gray-200" font="bold" text="sm md:lg") ${{ ixtToUSD(totalMinOffer) }}

      div(v-if="shares.value > 1" p="t-2")
        span(color="gray-200" m="t-10" text="lt-md:xs") Avg. offer per unit
        HList(items="end" space-x="3" text="lt-md:xs")
          span(color="white" font="bold") {{averageOfferPerItem}} IXT
          span(color="yellow-200") {{belowHighestOffer}}% below highest offer

    //- SAVE BELOW FOR FUTURE NEED
    //- HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
    //- InputCheckbox(v-model="maxPrice")
    //-   span(color="gray-200") Max price per listing

    VList(justify="end" space-y="3" v-if="item.nft_type === NFTType.ERC1155" display="lt-md:none")
      Adjustable(v-model="shares" h="full" :is-neutral="true")
      span(color="yellow-200" v-if="showDecreaseMinPrice") Try decreasing your lowest offer per unit to accept more items

  VList(px="4" p="b-6" space-y="3" v-if="item.nft_type === NFTType.ERC1155" display="md:none")
    Adjustable(v-model="shares" h="full" :is-neutral="true")
    span(color="yellow-200" v-if="showDecreaseMinPrice") Try decreasing your lowest offer per unit to accept more items

  HList(px="4 md:6" py="4" b="t-1 b-1 gray-600" space-x="3" items="center" justify="between" w="full")
    div(flex="~ col md:row" space-y="4 md:0" w="full" whitespace="nowrap")
      InputCheckbox(v-model="isSubstituteOffering")
        span(color="gray-200") Substitute offers

      div(flex="~ col md:row" items="center" w="full" v-if="isSubstituteOffering" space-x="0 md:4")
        HList(color="white" w="full" justify="start md:end")
          span(color="white") Lowest offer per unit
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

const { ixtToUSD } = useIXTPrice()
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
  title: 'Error processing your purchase'
})

</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(246, 186, 30, 0.75);
}
</style>
