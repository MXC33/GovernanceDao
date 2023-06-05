<template lang="pug">
VList(w="full" flex-grow="1" items="start" bg="gray-900" p="6" pos="relative")
  header(font="bold" w="full")
    HList(items="center" space-x="3")
      TokenName(:token="token" text="base md:xl ellipsis" capitalize="~")

      div(v-if="is1155" text="lt-md:xs") x{{showAssetAmount}}

    div(text="sm md:lg") 
      slot(name="subtitle") {{ token?.sale_price }} IXT

  div(flex-grow="1")

  div(text="sm md:base" color="gray-200")
    slot(name="detail") Best offer: {{ token?.higher_bid_price }} IXT

  slot(name="footer")
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';

const is1155 = computed(() => ERC1155Addresses.includes(token.collection))


const showAssetAmount = computed(() => {
  if (context == 'my-assets')
    return formatMyShareAmount(token.my_shares)
  return formatMyShareAmount(token.shares)
})

const formatMyShareAmount = (shares: number) => {
  if (shares > 1000)
    return String(shares / 1000).substring(0, 4) + "K"
  return shares
}

const { token, context } = defineProps<{
  token: IXToken,
  quantity?: number,
  context?: CollectionContext
}>()


</script>