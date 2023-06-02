<template lang="pug">
VList()
  HList(px="6" py="8" space-y="2" items="start")
    div(grow="1" w="full")
      span(color="gray-200" v-if="shares.value > 1" ) Total offer amount
      span(color="gray-200" v-else) Highest offer
      template(v-if="!isSubstituteOffering")
        HList(items="end" space-x="3" )
          template(v-if="!isDisabled" )
            span(color="white" font="bold" text="4xl") {{totalOffer}} IXT
            span(color="gray-200" font="bold" text="lg") ${{ ixtToUSD(totalOffer) }}
          template
            span(color="white" font="bold" text="4xl") -- IXT
            span(color="gray-200" font="bold" text="lg") $ --

      template(v-else)
        HList(items="end" space-x="3" )
          span(color="white" font="bold" text="4xl") {{totalMinOffer}} IXT
          span(color="gray-200" font="bold" text="lg") ${{ ixtToUSD(totalMinOffer) }}

      div(v-if="shares.value > 1" )
        span(color="gray-200" m="t-10") Avg. offer per unit
        HList(items="end" space-x="3")
          span(color="white" font="bold") {{averageOfferPerItem}} IXT
          span(color="yellow-200") {{belowHighestOffer}}% below highest offer

    //- SAVE BELOW FOR FUTURE NEED
    //- HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center")
    //- InputCheckbox(v-model="maxPrice")
    //-   span(color="gray-200") Max price per listing

    VList(justify="end" space-y="3")
      Adjustable(v-model="shares" h="full" :is-neutral="true")
      span(color="yellow-200" v-if="showDecreaseMinPrice" ) Try decreasing your lowest offer per unit to accept more items

  HList(px="6" py="3.5" b="t-1 b-1 gray-600" space-x="3" items="center" justify="between")
    InputCheckbox(v-model="isSubstituteOffering")
      span(color="gray-200") Substitute offers
    HList( space-x="3" items="center" v-if="isSubstituteOffering")
      span(color="white") Lowest offer per unit
      InputText(v-model="minOffer" :class="{highlighted: showDecreaseMinPrice}")
        template(#suffix) IXT

  div(grid="~ cols-2" text="base")
    ButtonInteractive(btn="~ secondary" font="bold" @click="onClickSell" text="List item")

    ButtonInteractive(btn="~ primary " font="bold" @click="accept" v-if="!isDisabled" :text="`Accept ${shares.value} offer`")
    ButtonInteractive(btn="~ primary" bg="on-disabled:gray-700" color="on-disabled:gray-400" cursor="default" font="bold" :disabled="isDisabled" text="You have no offers" v-else)

</template>

<script lang="ts" setup>
import type {SingleItemData} from "@ix/base/composables/Token/useIXToken";
import {useOfferContract, useOfferItems} from "~/composables/useOffer";

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
  console.log('acceptOffers', await acceptOffers(
    selectedBidsToAccept.value,
    !isSubstituteOffering ? totalOffer.value : totalMinOffer.value,
    shares.value.value
  ))
}

</script>

<style scoped >
.highlighted {
  box-shadow: 0px 0px 8px 1px rgba(246, 186, 30, 0.75);
}
</style>
