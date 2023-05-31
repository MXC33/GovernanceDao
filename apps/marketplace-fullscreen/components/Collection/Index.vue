<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  CollectionHeader() 
    template(#header) 
      slot(name="name" v-if="data?.name != 'PlanetIX Assets'") {{ data?.name }}
      slot(name="name" v-else) PlanetIX - Assets

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  slot(name="menu")

  //- HelperBorderScroll(pos="sticky top-33")
  CollectionFilter(:items="data.nfts" :filters="data.filters" :hide-toggle="hideGrid" v-if="data"  @toggle-filter="toggleFilterDrawer")

  CollectionList(:columns="renderColumns" :items="data?.nfts" v-if="data" :hide-grid="hideGrid", :context="context" :show-filters="showFilters")

  slot(name="bottom")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="selectedItems.length > 0" :context="context")
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'

const { activeFilters } = useCollectionSettings()
const { ixtToUSD } = useIXTPrice()
const { selectedItems } = useSelection()

const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => data ? getCollectionAttributes(data) : [])

const defaultColumns: TableColumn<IXToken>[] = [
  { label: "Asset", columnId: "name" },
  { label: "Current price", columnId: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", columnId: "sale_price", type: 'usd', sortable: true },
  { label: "Best offer", columnId: "higher_bid_price", type: 'ixt', sortable: true },
]

const renderColumns = computed(() => columns ?? defaultColumns)

const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
}

const { data, columns, context = 'collection' } = defineProps<{
  data?: CollectionData,
  columns?: TableColumn<IXToken>[],
  hideGrid?: boolean,
  context?: CollectionContext
}>()


const usdPriceOrigin = (data: IXToken) => {
  if (context == 'outgoing-bids' || context == 'incoming-bids')
    return ixtToUSD(data.bid.price)
  else if (context == 'active-listings')
    return ixtToUSD(data.sales[0].price)
  else
    return ixtToUSD(data.sale_price)
}

// watch([data, ixtPrice], () => {
//   rows.value = (data?.nfts ?? []).map((row) => ({
//     ...row
//     // usd: usdPriceOrigin(row)
//   }))
// }, { immediate: true })

onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>