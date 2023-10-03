<template lang="pug">
span() {{ priceString }}
  

</template>

<script lang="ts" setup>
import type { NftFragment } from '#gql';
import type { Currency } from '~/composables/corporations/useCorporationShop';
import type { InfoBlockItemCurrency } from '~~/composables/useInfoBlocks';

const { usdToIXT, ixtToUSD } = useIXTPrice()

const { chosenCurrency } = useCorporationShop()

const { item } = defineProps<{
  item: InfoBlockItemCurrency,
  token: NftFragment
}>()

const priceInSelectedCurrency = computed(() => {
  const ignoredCurrencies: Currency[] = ['matic', 'weth']
  const isIgnored = ignoredCurrencies.includes(chosenCurrency.value)
  const isSame = item.type == chosenCurrency.value
  const amount = Number(item.amount)

  if (isIgnored || isSame)
    return formatPrice(amount, item.type)

  if (item.type == 'usdt')
    return formatPrice(usdToIXT(amount), 'ixt')

  return formatPrice(ixtToUSD(amount), 'usdt')
})

const formatPrice = (amount: number, type: Currency) => amount + ' ' + type

const priceString = computed(() => {
  if (item.amount == 0)
    return 'Free'
  return priceInSelectedCurrency.value
})

</script>
