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
          span() {{ isRounded }} IXT
        HList(justify="end" color="gray-200")
          span(mb="4") $

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
        p {{invalidPrice ?? roundToDecimals(totalIXTPrice, 4)}} IXT

      HList(w="full" justify="between")
        div(color="gray-200") Marketplace fee
        p 2.5%

      HList(w="full" justify="between" text="lg" font="bold")
        p() Total potential earnings
        p {{invalidPrice ?? roundToDecimals(totalIXTPrice * (1 - 0.025), 4)}} IXT

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

const { ixtToUSD, ixtAsUSD } = useIXTPrice()
const { ixtBalanceOfUser } = getIXTokenContract()

const balance = await ixtBalanceOfUser()
const isRounded = roundToDecimals(balance, 2)
const inDollar = ixtToUSD(isRounded)


const onClickList = async () => {
  const list = await listItem(listItems.value[0])
  console.log('List result', list)
}

const props = defineProps<{
  items: SingleItemData[],
}>()

createListItems(props.items, 1)

</script>