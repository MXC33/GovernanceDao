<template lang="pug">
div(m="t-10" p="5" bg="#141414" color="#F9F9F9" overflow="hidden" v-if="item.name" )
  HList(w="full" justify="between" m="b-4")
    h2 List Item
    button(text="6" @click.prevent="emit('closed')") x
  //- HList(w="full" justify="between" gap="4")
  //-   img(:src="item.image" width=200)
  //-   div(grow="1")
  //-     h2 {{item.name}}
  //-     h2 {{item.parent.name}}

  hr(m="t-4 b-4" bg="#000" h="1px")

  HList(w="full" justify="between" gap="4" v-if="item.sale_price")
    p Floor price
    p {{item.sale_price}} IXT
  HList(w="full" justify="between" gap="4" v-if="item.higher_bid_price")
    p Best Offer
    p {{item.higher_bid_price}} IXT

  hr(m="t-4 b-4" bg="#000" h="1px")

  h2(m="b-2") Set a price for unit
  div(m="b-2")
    HList(w="full" justify="between")
      input(type="number" min=0 w="full" grow="1" v-model="price" color="#000" text="5" @keypress="useIsKeyNumber($event)")
      span IXT
    HList(w="full" justify="between")
      p ${{price*qty}} Total (${{price}} each)
      p Total offer amount: {{price*qty}} IXT Total (${{price*qty}})
  div.columns-2(m="b-2")
    div
      h2 Quantity
      p {{item.my_shares}} available
    div
      InputQty(:min="1" :max="item.my_shares" v-model="qty" )

  div.columns-2(m="b-2")
    div
      h2 Duration
      p Ending May 13, 2023 at 9:53 AM
    div
      select(w="full" color="#000" text="5")
        option(:value="option.value" v-for="(option, index) in listing.durationOptions" ) {{option.name}}

  hr(m="t-4 b-4" bg="#000" h="1px")

  HList(w="full" justify="between")
    p Total Price
    p {{price*qty}} IXT
  HList(w="full" justify="between")
    p Marketplace fee
    p 2.5%
  HList(w="full" justify="between")
    h2 Total potential earnings
    p {{price*qty*(1-0.025)}} IXT

  button(btn="~ primary" w="full" m="t-5" @click.prevent="listItem") List Items

</template>

<script lang="ts" setup>
import { useIsKeyNumber } from "@ix/base/composables/Utils/useHelpers"
import type { SingleItemData } from "@ix/base/composables/Token/useIXToken"

const props = defineProps<{
  item: SingleItemData
  quantity: number
}>()

const emit = defineEmits(["closed"])

const qty = ref<number>(props.quantity || 0)
const price = ref<number>(0)
const listing = useListing()

watch(props, (newProps) => {
  qty.value = newProps.quantity
})

const listItem = async () => {
  const listing = useListing()
  const list = await listing.list(toRaw(props.item as SingleItemData), price.value, qty.value, 1685019917)
  console.log('List result', list)
}

</script>

<style scoped></style>
