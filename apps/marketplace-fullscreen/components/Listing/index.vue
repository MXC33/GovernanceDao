<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList()
      TransactionIXTBalance()

      //- TransactionApplyToAll(v-model="listItems")

      ListingItem(v-for="(_, index) in listItems" v-model="listItems[index]")

  template(#footer)
    ListingPrice(:items="listItems")

  template(#buttons)
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickList" text="List Items" :invalid="isItemInvalid(listItems, true)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

const isLoading = ref(false)

const { createListItems, listItems } = useListingItems()
const { listItem } = useListingContract()
const { isItemInvalid } = useTransactions()
const { displaySnack } = useSnackNotifications()

const { displayPopup } = usePopups()

const { addError } = useContractErrors()

const onClickList = async () => {
  isLoading.value = true

  try {
    await listItem(listItems.value[0])

    displayPopup({
      type: 'listing-successful',
      items: listItems.value
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