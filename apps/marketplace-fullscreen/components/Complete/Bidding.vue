<template lang="pug">
Popup()
  template(#icon)
    CheckboxIcon(w="6" h="6")

  template(#header) BID SUCCESSFUL!

  template(#default)
    VList(min-h="30")
      TokenSlideshow(:tokens="mappedTokens")

    VList()
      HList(justify="between" v-for="item in items" font="bold" text="sm")
        TokenName(:token="item.token")
        div x{{ item.shares.value }}

  template(#footer)
    BiddingPrice(:items="items" )

  template(#buttons)
    HList()
      button(@click="onClickOutgoingBids" btn="~ secondary") View in outgoing bids
      button(@click="closeActivePopup" btn="~ primary") Continue exploring

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
