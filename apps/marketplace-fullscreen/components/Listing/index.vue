<template lang="pug">
Popup()
  template(#icon)
    ListingIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList()
      VList()
        HList(text="lg" font="bold" justify="between")
          span() Your Balance
          span() 123718 IXT
        HList(justify="end" color="gray-200")
          span(mb="4") $8.4

      ContentDrawer(frame="none" mx="-6" mb="4" b="t-1 b-1 gray-600" :is-neutral="true")
        template(#header) APPLY TO ALL
        template(#default)
          ListingApplyAll()
            template(#header) Floor price
            template(#button) Set to Floor





      ListingItem(v-for="(item, index) in listItems" v-model="listItems[index]")

  template(#footer)
    VList()
      HList(w="full" justify="between")
        div(color="gray-200") Total Price
        p {{invalidPrice ?? totalIXTPrice}} IXT

      HList(w="full" justify="between")
        div(color="gray-200") Marketplace fee
        p 2.5%

      HList(w="full" justify="between" text="lg" font="bold")
        p() Total potential earnings
        p {{invalidPrice ?? (totalIXTPrice * (1-0.025 ))}} IXT

  template(#buttons)
    button(btn="~ primary" w="full" @click.prevent="onClickList") List Items

</template>

<script lang="ts" setup>
import type { SingleItemData } from "@ix/base/composables/Token/useIXToken"
import ListingIcon from '~/assets/icons/listing.svg'

defineEmits(['close'])

const { createListItems, listItems, totalIXTPrice } = useListingItems()
const { listItem } = useListingContract()

const invalidPrice = computed(() => {
  if (!totalIXTPrice.value)
    return '--'
})

const onClickList = async () => {
  const list = await listItem(listItems.value[0])
  console.log('List result', list)
}

const props = defineProps<{
  items: SingleItemData[],
}>()

createListItems(props.items, 1)

</script>