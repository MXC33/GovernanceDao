<template lang="pug">
Popup()
  template(#icon)
    BiddingIcon()

  template(#header) {{ $t(`marketplace.bid.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="bidItems")

      BiddingItem(v-for="(_, index) in bidItems" v-model="bidItems[index]")

  template(#footer)
    BiddingPrice(:items="bidItems" v-if="bidItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickBid" text="Place bid" :invalid="itemsInvalid(bidItems)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import BiddingIcon from '~/assets/icons/bidding.svg'

const isLoading = ref(false)

const { createBidItems, bidItems } = useBiddingItems()
const { bidItem } = useBiddingContract()
const { itemsInvalid } = useTransactions()

const { displayPopup } = usePopups()

const onClickBid = async () => {
  isLoading.value = true
  const bid = await bidItem(bidItems.value[0])
  isLoading.value = false
  console.log('Bid result', bid)

  displayPopup({
    type: 'bidding2-successful',
    items: bidItems.value
  })
}

const { items } = defineProps<{
  items: IXToken[],
}>()

createBidItems(items)

</script>
