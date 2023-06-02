<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) BID SUCCESSFUL!

  template(#default)
    CompleteTokenList(:items="items")

  template(#footer)
    BiddingPrice(:items="items" )

  template(#buttons)
    HList()
      button(@click="onClickOutgoingBids" btn="~ secondary" w="full") View in outgoing bids
      button(@click="closeActivePopup" btn="~ primary" w="full") Continue exploring

</template>


<script lang="ts" setup>
import CheckboxIcon from '~/assets/icons/checkmark-green.svg'
import type { BiddingItem } from '~/composables/useBidding';
const { closeActivePopup } = usePopups()
const { items } = defineProps<{
  items: BiddingItem[]
}>()

const mappedTokens = computed(() => items.map((item) => item.token))
console.log("Token", mappedTokens)

const onClickOutgoingBids = () => {
  navigateTo('/account/bids/outgoing')
  return closeActivePopup()
}

defineEmits(["close"])

</script>
