<template lang="pug">
PopupBase()
  template(#icon)
    BiddingIcon()

  template(#header) {{ $t(`marketplace.reject.title`) }}

  template(#default)
    VList(space-y="6")
      //- TransactionIXTBalance()

      RejectingItem(:item="item" v-for="(item) in rejectItems")

  template(#footer)
    //- AcceptingPrice(:items="rejectItems" v-if="rejectItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickReject" text="Reject offer" :invalid="itemsInvalid(rejectItems, true)" :loading="isLoading")
  
  </template>
  
<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import BiddingIcon from '~/assets/icons/bidding.svg'

const { createRejectionItems, rejectItems } = useRejectItems()

const { itemsInvalid } = useTransactions()
const { displayPopup } = usePopups()
const { rejectBid } = useBidsAPI()

const { loading: isLoading, execute: rejectRequest } = useContractRequest(() =>
  rejectBids()
)

const rejectBids = async () => {
  return rejectItems.value.map((item) => {
    console.log("item", item.bid)
    rejectBid(item.token, item.bid)
  }
  )
}

const onClickReject = async () => {
  const reject = await rejectRequest()

  if (reject)
    displayPopup({
      type: 'reject-items-success',
      items: rejectItems.value
    })
}

const { items } = defineProps<{
  items: IXToken[],
}>()

createRejectionItems(items)

</script>
  