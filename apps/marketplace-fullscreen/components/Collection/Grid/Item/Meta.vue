<template lang="pug">
VList(w="full" flex-grow="1" items="start" bg="gray-900" p="6" pos="relative")
  header(font="bold" w="full")
    HList(items="center" space-x="3")
      TokenName(:token="token" :key="getTokenKey(token)" text="base md:xl ellipsis" capitalize="~")

      div(v-if="is1155" text="lt-md:xs") x{{showAssetAmount}}

    div(text="sm md:lg") 
      slot(name="subtitle") 
        template(v-if="isDisabled") -- IXT
        template(v-else) {{ roundToDecimals(token?.sale_price, 6) }} IXT

  div(flex-grow="1")

  div(text="sm md:base" color="gray-200" whitespace="nowrap")
    slot(name="detail")
      template(v-if="isDisabled") Best offer: -- IXT
      template(v-else) Best offer: {{ token?.higher_bid_price }} IXT

  slot(name="footer")
      
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';

const is1155 = computed(() => ERC1155Addresses.includes(token.collection))
const { getTokenKey } = useTokens()
const { formatAmount } = useFormatNumber()

const showAssetAmount = computed(() => {
  if (context == 'my-assets')
    return formatAmount(token.my_shares)
  return formatAmount(token.shares)
})

const { token, context } = defineProps<{
  token: IXToken,
  quantity?: number,
  context?: CollectionContext,
}>()

console.log(token?.sale_price)

const isDisabled = computed(() => token?.sale_price == 0)

</script>