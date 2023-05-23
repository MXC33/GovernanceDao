<template lang="pug">
div(z="1000" pos="relative")
  pre {{IXToken.name}}
  HList(w="full" justify="between")
    h2 Sell
    p you onwn {{IXToken.my_shares}}
  div.columns-2
    div
      p Current offer price
      h2 {{IXToken.higher_bid_price}} IXT
        span(m="l-2") $1.12
        span(m="l-2") quantity: {{listQuantity}}
    InputQty(:min="1" :max="IXToken.my_shares" v-model="listQuantity")
  div
    button.btn(type="button") List {{listQuantity}} Item

  ListItem(:IXToken="IXToken" :quantity="listQuantity")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'

const props = defineProps<{
  IXToken: IXToken
}>()

const listQuantity = ref<number>(1)

</script>

<style scoped>
.btn {
  background: #fff;
  color: #000;
  padding: 5px 10px;
}
</style>