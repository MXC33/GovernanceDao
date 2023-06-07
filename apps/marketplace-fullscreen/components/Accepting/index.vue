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
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickAccept" text="Accept offer" :invalid="itemsInvalid([acceptingItem])" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import BiddingIcon from '~/assets/icons/bidding.svg'
import {useAcceptingItem, useOfferContract} from "~/composables/useOffer";

const isLoading = ref(false)

const { createAcceptingItem, acceptingItem } = useAcceptingItem()
const { acceptOffer } = useOfferContract()
const { itemsInvalid } = useTransactions()

const { displayPopup } = usePopups()

const { addError } = useContractErrors()

const onClickAccept = async () => {
  isLoading.value = true

  try {
    const accept = await acceptOffer(acceptingItem.value)
    if (accept)
      displayPopup({
        type: 'accept-items-success',
        item: acceptingItem.value
      })

  } catch (err) {
    console.log("ERR", err)
    //@ts-ignore
    const message = err?.message
    addError({
      title: 'Error accepting offer',
      serverError: message
    })
  }

  isLoading.value = false
}

const { item } = defineProps<{
  item: IXToken,
}>()

createAcceptingItem(item)

</script>
