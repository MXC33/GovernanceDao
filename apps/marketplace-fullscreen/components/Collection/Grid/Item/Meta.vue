<template lang="pug">
VList(w="full" flex-grow="1" items="start" bg="gray-900" p="6" pos="relative")
  header(font="bold" w="full")
    HList(items="center" space-x="3")
      TokenName(:token="token" text="xl ellipsis" capitalize="~")

      div(v-if="is1155") x{{shares}}

    div(text="lg" ) 
      slot(name="subtitle") {{ token?.sale_price }} IXT

  div(flex-grow="1")

  div(text="md gray-200")
    slot(name="detail") Best offer: {{ token?.higher_bid_price }} IXT

  slot(name="footer")
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const is1155 = computed(() => ERC1155Addresses.includes(token.collection))

const shares = computed(() => {
  const { my_shares: myShares } = token

  if (myShares > 1000)
    return String(myShares / 1000).substring(0, 4) + "K"

  return myShares
})

const { token } = defineProps<{
  token: IXToken,
  quantity?: number,
}>()


</script>