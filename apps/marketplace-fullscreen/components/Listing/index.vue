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
    ButtonInteractive(btn="~ primary" w="full" @click.prevent="onClickList" text="List Items" :invalid="itemsInvalid(listItems)" :loading="isLoading")

</template>

<script lang="ts" setup>
import type { IXToken } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

const isLoading = ref(false)

const { createListItems, listItems } = useListingItems()
const { listItem } = useListingContract()
const { itemsInvalid } = useTransactions()

const { displayPopup } = usePopups()

const onClickList = async () => {
  isLoading.value = true
  const list = await listItem(listItems.value[0])
  isLoading.value = false
  console.log('List result', list)

  displayPopup({
    type: 'listing-successful',
    items: listItems.value
  })
}

const { items } = defineProps<{
  items: IXToken[],
}>()

createListItems(items)

</script>