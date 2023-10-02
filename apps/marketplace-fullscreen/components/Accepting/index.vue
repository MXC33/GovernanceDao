<template lang="pug">
PopupBase()
  template(#icon)
    BiddingIcon()

  template(#header) {{ $t(`marketplace.offer.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="bidItems")

      AcceptingItem(v-model="acceptingItems[index]" v-for="(item, index) in acceptingItems")

  template(#footer)
    AcceptingPrice(:items="acceptingItems" v-if="acceptingItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickAccept" text="Accept offer" :invalid="itemsInvalid(acceptingItems, true)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import BiddingIcon from '~/assets/icons/bidding.svg'
import { useAcceptingItem, useOfferContract } from "~/composables/useOffer";


const { createAcceptingItems, acceptingItems } = useAcceptingItem()
const { multiAccept } = useOfferContract()
const { itemsInvalid } = useTransactions()
const { displayPopup } = usePopups()

const { loading: isLoading, execute: acceptRequest } = useContractRequest(() =>
  multiAccept(acceptingItems.value)
)

const onClickAccept = async () => {
  const accept = await acceptRequest()

  if (accept)
    displayPopup({
      type: 'accept-items-success',
      items: acceptingItems.value
    })
}

const { items } = defineProps<{
  items: IXToken[],
}>()

createAcceptingItems(items)

</script>
