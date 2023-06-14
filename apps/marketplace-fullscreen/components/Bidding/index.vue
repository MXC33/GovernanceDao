<template lang="pug">
Popup()
  template(#icon)
    BiddingIcon()

  template(#header) {{ $t(`marketplace.bid.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="bidItems")
      VList(space-y="6")
        BiddingItem(v-for="(_, index) in bidItems" v-model="bidItems[index]" :is-multiple="bidItems.length > 1")

  template(#footer)
    BiddingPrice(:items="bidItems" v-if="bidItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickBid" text="Place bid" :invalid="isItemInvalid(bidItems, true)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import BiddingIcon from '~/assets/icons/bidding.svg'

const { createBidItems, bidItems } = useBiddingItems()
const { placeBids } = useBiddingContract()
const { isItemInvalid } = useTransactions()
const { displayPopup } = usePopups()

const { loading: isLoading, execute: bidRequest } = useContractRequest(() =>
  placeBids(bidItems.value)
)

const onClickBid = async () => {
  const bidSuccessful = await bidRequest()

  if (bidSuccessful)
    displayPopup({
      type: 'bidding-successful',
      items: bidItems.value
    })
}


const { items } = defineProps<{
  items: IXToken[],
}>()

createBidItems(items)

</script>
