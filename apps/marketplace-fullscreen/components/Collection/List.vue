<template lang="pug">
Transition(name="fade" mode="out-in" )
  CollectionGrid(v-if="displayType == 'grid' && !hideGrid" w="full" :is-open="showFilters")
    CollectionGridItem.collection-grid-item(:token="token" v-for="token in items" b="gray-400" :context="context")

  Table(:columns="columns" :rows="items" v-else id="collection")
    template(#item-name="{row}")
      HList(items="center" space-x="2" font="bold")
        div(w="12" h="12")
          TokenImage(:token="row" w="12" h="12" :key="getTokenKey(row)")
        TokenName(:token="row" capitalize="~" :key="getTokenKey(row)")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
const { displayType } = useCollectionSettings()
const { getTokenKey } = useTokens()

const { items, columns, context = 'collection' } = defineProps<{
  items: IXToken[],
  columns: TableColumn<IXToken>[],
  hideGrid?: boolean,
  showFilters: boolean,
  context?: CollectionContext
}>()

// const rows = ref<IXToken[]>([])

// const usdPriceOrigin = (data: IXToken) => {
//   if (context == 'outgoing-bids' || context == 'incoming-bids')
//     return ixtToUSD(data.bid.price)
//   else if (context == 'active-listings')
//     return ixtToUSD(data.sales[0].price)
//   else
//     return ixtToUSD(data.sale_price)
// }

// watch([data, ixtPrice], () => {
//   rows.value = (data?.nfts ?? []).map((row) => ({
//     ...row,
//     usd: usdPriceOrigin(row)
//   }))
// }, { immediate: true })

// watch(rows, () => {
//   console.log("New rows", rows.value)
// }, { deep: true })

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>