<template lang="pug">
div(m="t-10" p="5" bg="#141414" color="#F9F9F9" overflow="hidden")
  HList(w="full" justify="between" m="b-4")
    h2 List Item
    button(text="6") x
  HList(w="full" justify="between" gap="4")
    img(:src="IXToken.image" width=200)
    div(grow="1")
      h2 {{IXToken.name}}
      h2 {{IXToken.parent.name}}

  hr(m="t-4 b-4" bg="#000" h="1px")

  HList(w="full" justify="between" gap="4" v-if="IXToken.sale_price")
    p Floor price
    p {{IXToken.sale_price}} IXT
  HList(w="full" justify="between" gap="4" v-if="IXToken.higher_bid_price")
    p Best Offer
    p {{IXToken.higher_bid_price}} IXT

  hr(m="t-4 b-4" bg="#000" h="1px")

  h2(m="b-2") Set a price for unit
  div(m="b-2")
    HList(w="full" justify="between")
      input(type="number" min=0 w="full" grow="1" v-model="price" color="#000" text="5" @keypress="useIsKeyNumber($event)")
      span IXT
    HList(w="full" justify="between")
      p ${{price*quantity}} Total (${{price}} each)
      p Total offer amount: {{price*quantity}} IXT Total (${{price*quantity}})
  div.columns-2(m="b-2")
    div
      h2 Quantity
      p {{IXToken.my_shares}} available
    div
      InputQty(:value="props.quantity" :min="1" :max="IXToken.my_shares" v-model="quantity" )

  div.columns-2(m="b-2")
    div
      h2 Duration
      p Ending May 13, 2023 at 9:53 AM
    div
      select(w="full" color="#000" text="5")
        option(value="1") 3 Days
        option(value="2") 1 Week
        option(value="3") 1 Month

  hr(m="t-4 b-4" bg="#000" h="1px")

  HList(w="full" justify="between")
    p Total Price
    p {{price*quantity}} IXT
  HList(w="full" justify="between")
    p Marketplace fee
    p 2.5%
  HList(w="full" justify="between")
    h2 Total potential earnings
    p {{price*quantity*(1-0.025)}} IXT

  button(btn="~ primary" w="full" m="t-5") List Items

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import {useIsKeyNumber} from "@ix/base/composables/Utils/useHelpers"

const props = defineProps<{
  IXToken: IXToken
  quantity: number
}>()

const quantity = ref<number>(props.quantity || 0)
const price = ref<number>(0)

watch(props, (newProps) => {
  quantity.value = newProps.quantity
})

</script>

<style scoped>

</style>