<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="listItems")
      VList(space-y="6")
        ListingItem(v-for="(_, index) in activeListItems" v-model="activeListItems[index]")

  template(#footer)
    ListingPrice(:items="activeListItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickList" text="List Items" :invalid="isItemInvalid(activeListItems, true)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

const isLoading = ref(false)

const { createListItems, listItems: activeListItems } = useListingItems()
const { listItems } = useListingContract()
const { isItemInvalid } = useTransactions()
const { displaySnack } = useSnackNotifications()

const { displayPopup } = usePopups()

const { addError } = useContractErrors()

const onClickList = async () => {
  isLoading.value = true

  try {
    await listItems(activeListItems.value)

    displayPopup({
      type: 'listing-successful',
      items: activeListItems.value
    })
  } catch (err) {
    console.log("ERR", err)
    //@ts-ignore
    const message = err?.message

    if (message?.includes('rejected'))
      return displaySnack('transaction-rejected')

    addError({
      title: 'Error listing',
      serverError: message
    })
  }

  isLoading.value = false
}

const { items } = defineProps<{
  items: IXToken[],
}>()

createListItems(items)

</script>