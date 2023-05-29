<template lang="pug">
div(z="1000" pos="relative" v-if="item.name" )
  p {{item.name}}
  HList(w="full" justify="between")
    h2 Sell
    p you onwn {{item.my_shares}}
  div.columns-2
    div
      p Current offer price
      h2 {{item.higher_bid_price}} IXT
        span(m="l-2") $1.12
        span(m="l-2") quantity: {{listQuantity}}
    InputQty(:min="1" :max="item.my_shares" v-model="listQuantity")
  div
    button.btn(type="button" @click="toggleListItem(true)") List {{listQuantity}} Item

  ListingItem(:item="item" :quantity="listQuantity" v-if="showListItem" @closed="toggleListItem(false)")

</template>

<script lang="ts" setup>
import type {SingleItemData} from "@ix/base/composables/Token/useIXToken"

const props = defineProps<{
  item: SingleItemData
}>()

const listQuantity = ref<number>(1)
const showListItem = ref<boolean>(false)

const toggleListItem = (value: boolean) => {
  showListItem.value = value
}

</script>

<style scoped>
.btn {
  background: #fff;
  color: #000;
  padding: 5px 10px;
}
</style>