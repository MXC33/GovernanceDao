<template lang="pug">
VList(w="full" flex-grow="1" items="start" bg="gray-900" p="6" pos="relative")
  header(font="bold" w="full")
    NuxtLink(:to="getItemLink(token)" flex="~ row" rel="noopener" items="center" space-x="3"  cursor="pointer")
      TokenName(:token="token" :key="getTokenKey(token)" text="base md:xl ellipsis" capitalize="~")

      div(v-if="is1155" ) x{{showAssetAmount}}

    div(text="sm md:lg") 
      slot(name="subtitle") 
        template(v-if="isDisabled") -- IXT
        template(v-else) {{ setPriceDecimals }} IXT

  div(flex-grow="1")

  div(text="sm md:base" color="gray-200" whitespace="nowrap")
    slot(name="detail")
      template(v-if="!token?.higher_bid_price") {{ $t(`collection.attributes.sale_price`) }}: -- IXT
      template(v-else) {{ $t(`collection.attributes.sale_price`) }}: {{ token?.higher_bid_price }} IXT

  slot(name="footer")
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';

const { token, context } = defineProps<{
  token: IXToken,
  quantity?: number,
  context?: CollectionContext,
}>()

const is1155 = computed(() => ERC1155Addresses.includes(token.collection))
const { getTokenKey } = useTokens()
const { formatAmount } = useFormatNumber()

const showAssetAmount = computed(() => {
  if (context == 'my-assets')
    return formatAmount(token.my_shares)
  return formatAmount(token.shares)
})

const setPriceDecimals = computed(() => {
  if (token?.sale_price < 0.009)
    return roundToDecimals(token?.sale_price, 4)
  return roundToDecimals(token?.sale_price, 2)
})

const getItemLink = (token: IXToken) => {
  const { network, collection, token_id } = token
  return `/assets/${network}/${collection}/${token_id}`
}

const isDisabled = computed(() => !token?.sale_price || token?.sale_price == 0)
</script>