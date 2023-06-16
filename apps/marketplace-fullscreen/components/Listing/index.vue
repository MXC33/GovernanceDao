<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList(space-y="6")
      TransactionIXTBalance()

      TransactionApplyToAll(v-model="activeListItems")

      ListingItem(v-for="(_, index) in activeListItems" v-model="activeListItems[index]" :is-multiple="activeListItems.length > 1")

  template(#footer)
    ListingPrice(:items="activeListItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickList" text="List Items" :invalid="isItemInvalid(activeListItems, true)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

const { createListItems, listItems: activeListItems } = useListingItems()
const { placeListings } = useListingContract()
const { isItemInvalid } = useTransactions()
const { displayPopup } = usePopups()

const { loading: isLoading, execute: listItems } = useContractRequest(() => placeListings(activeListItems.value))

const onClickList = async () => {
  const didList = await listItems()

  if (didList)
    displayPopup({
      type: 'listing-successful',
      items: activeListItems.value
    })
}

const { items } = defineProps<{
  items: IXToken[],
}>()

createListItems(items)

</script>