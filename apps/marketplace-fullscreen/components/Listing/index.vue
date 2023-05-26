<template lang="pug">
Popup()
  template(#icon)
    TransferIcon()

  template(#header) {{ $t(`marketplace.list.title`) }}

  template(#default)
    VList()
      ListingItem(v-for="(item, index) in listItems" v-model="listItems[index]")

    //- HList(w="full" justify="between" gap="4" v-if="item.sale_price")
    //-   p Floor price
    //-   p {{item.sale_price}} IXT

    //- HList(w="full" justify="between" gap="4" v-if="item.higher_bid_price")
    //-   p Best Offer
    //-   p {{item.higher_bid_price}} IXT

    //- hr(m="t-4 b-4" bg="#000" h="1px")

    //- h2(m="b-2") Set a price for unit
    //- div(m="b-2")
    //-   HList(w="full" justify="between")
    //-     input(type="number" min=0 w="full" grow="1" v-model="price" color="#000" text="5" @keypress="useIsKeyNumber($event)")
    //-     span IXT
    //-   HList(w="full" justify="between")
    //-     p ${{price*qty}} Total (${{price}} each)
    //-     p Total offer amount: {{price*qty}} IXT Total (${{price*qty}})

    //- div.columns-2(m="b-2")
    //-   div
    //-     h2 Quantity
    //-     p {{item.my_shares}} available
    //-   div
    //-     InputQty(:min="1" :max="item.my_shares" v-model="qty" )

    //- div.columns-2(m="b-2")
    //-   div
    //-     h2 Duration
    //-     p Ending May 13, 2023 at 9:53 AM
    //-   div
    //-     select(w="full" color="#000" text="5")
    //-       //- option(:value="option.value" v-for="(option, index) in listing.durationOptions" ) {{option.name}}

  template(#footer)
    HList(w="full" justify="between")
      p Total Price
      p {{invalidPrice ?? totalIXTPrice}} IXT

    HList(w="full" justify="between")
      p Marketplace fee
      p 2.5%

    HList(w="full" justify="between")
      h2 Total potential earnings
      p {{invalidPrice ?? (totalIXTPrice * (1-0.025 ))}} IXT

  template(#buttons)
    button(btn="~ primary" w="full" @click.prevent="onClickList") List Items

</template>

<script lang="ts" setup>
import type { SingleItemData } from "@ix/base/composables/Token/useIXToken"
import TransferIcon from '~/assets/icons/transfer.svg'

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