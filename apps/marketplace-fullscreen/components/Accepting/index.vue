<template lang="pug">
Popup()
  template(#icon)
    BiddingIcon()

  template(#header) {{ $t(`marketplace.offer.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="bidItems")

      AcceptingItem(v-model="acceptingItem")

  template(#footer)
    AcceptingPrice(:item="acceptingItem" v-if="acceptingItem")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickAccept" text="Accept offer" :invalid="itemsInvalid([acceptingItem], true)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import BiddingIcon from '~/assets/icons/bidding.svg'
import { useAcceptingItem, useOfferContract } from "~/composables/useOffer";


const { createAcceptingItem, acceptingItem } = useAcceptingItem()
const { acceptOffer } = useOfferContract()
const { itemsInvalid } = useTransactions()
const { displayPopup } = usePopups()

const { loading: isLoading, execute: acceptRequest } = useContractRequest(() =>
  acceptOffer(acceptingItem.value)
)

const onClickAccept = async () => {
  const accept = await acceptRequest()

  if (accept)
    displayPopup({
      type: 'accept-items-success',
      item: acceptingItem.value
    })
}

const { item } = defineProps<{
  item: IXToken,
}>()

createAcceptingItem(item)

</script>
