<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.bid.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="bidItems")

      BiddingItem(v-for="(_, index) in bidItems" v-model="bidItems[index]")

  template(#footer)
    BiddingPrice(:items="bidItems" v-if="bidItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickList" text="Place bid" :invalid="itemsInvalid(bidItems)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

const { createBidItems, bidItems } = useBiddingItems()
const { itemsInvalid } = useTransactions()

const isLoading = ref(false)

const onClickList = async () => {
  // isLoading.value = true
  // const list = await listItem(listItems.value[0])
  // isLoading.value = false
  // console.log('List result', list)

  // displayPopup({
  //   type: 'listing-successful',
  //   items: listItems.value
  // })
}

const { items } = defineProps<{
  items: IXToken[],
}>()

console.log("BIDDDDD", items)

createBidItems(items)

</script>