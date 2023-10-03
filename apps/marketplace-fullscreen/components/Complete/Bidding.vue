<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) {{ $t(`marketplace.bid.bidSucess`) }}

  template(#default)
    CompleteTokenList(:items="items")

  template(#footer)
    BiddingPrice(:items="items" )

  template(#buttons)
    HList()
      button(@click="onClickOutgoingBids" btn="~ secondary" w="full") {{ $t(`marketplace.offer.viewInOutGoingBids`) }}
      button(@click="closeActivePopup" btn="~ primary" w="full") {{ $t(`marketplace.offer.continueExploring`) }}

</template>


<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { TransactionItem } from '~/composables/useTransactions';
const { closeActivePopup } = usePopups()
const { items } = defineProps<{
  items: TransactionItem[]
}>()

const mappedTokens = computed(() => items.map((item) => item.token))
console.log("Token", mappedTokens)

const onClickOutgoingBids = () => {
  navigateTo('/account/bids/outgoing')
  return closeActivePopup()
}

defineEmits(["close"])

</script>
