<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  CollectionHeader() 
    template(#header) 
      slot(name="name") {{ data?.name }}

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  slot(name="menu")

  //- HelperBorderScroll(pos="sticky top-33")
  CollectionFilter(:items="data.nfts" :filters="data.filters" :hide-toggle="hideGrid" v-if="data"  @toggle-filter="toggleFilterDrawer")

  HList(space-x="0 on-open:3" pos="relative" :open="showFilters")
    VList(pos="sticky top-48")
      Transition(name="slide-left")
        CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data")

    Transition(name="fade" mode="out-in" v-if="data")

      CollectionGrid(v-if="displayType == 'grid' && !hideGrid" w="full" :is-open="showFilters")
        CollectionGridItem.collection-grid-item(:token="token" v-for="token in data.nfts" b="gray-400" :context="context")
          template(#icon-left)
            HList(items="center" h="10" color="white" font="bold" bg="gray-600" px="5" cut="bottom-right md" v-if="is1155(token.collection)") x{{formatMyShareAmount(token.my_shares)}}
            div(p="4" pos="absolute" v-else)
              PolygonIcon(w="10" pos="absolute" inset="0")

      Table(:columns="renderColumns" :rows="rows" v-else id="collection")
        template(#item-name="{row}")
          HList(items="center" space-x="2" font="bold")
            div(w="12" h="12")
              TokenImage(:token="row" w="12" h="12" :key="getTokenKey(row)")
            TokenName(:token="row" capitalize="~" :key="getTokenKey(row)")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="cartItems.length > 0")
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
import PolygonIcon from '~/assets/icons/polygon_filled.svg'


const { displayType, activeFilters } = useCollectionSettings()
const { getTokenKey } = useTokens()
const { cartItems } = useCart()
const { ixtAsUSD, ixtPrice } = useIXTPrice()

const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => data ? getCollectionAttributes(data) : [])

const defaultColumns: TableColumn<IXToken>[] = [
  { label: "Asset", columnId: "name" },
  { label: "Current price", columnId: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", columnId: "usd", type: 'usd', sortable: true },
  { label: "Best offer", columnId: "higher_bid_price", type: 'ixt', sortable: true },
]

const is1155 = (contractAddress: string) => ERC1155Addresses.includes(contractAddress)

const formatMyShareAmount = (myShares: number) => {
  if (myShares > 1000)
    return String(myShares / 1000).substring(0, 4) + "K"
  return myShares
}

const renderColumns = computed(() => columns ?? defaultColumns)

const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
}

const isFilterActive = computed(() => {
  if (showFilters.value = true)
    return true
})

const { data, columns, context = 'collection' } = defineProps<{
  data?: CollectionData,
  columns?: TableColumn<IXToken>[],
  hideGrid?: boolean,
  context?: CollectionContext
}>()

const rows = ref<IXToken[]>([])

const usdPriceOrigin = (data: IXToken) => {
  if (context == 'outgoing-bids' || context == 'incoming-bids')
    return ixtAsUSD(data.bid.price).value
  else if (context == 'active-listings')
    return ixtAsUSD(data.sales[0].price).value
  else
    return ixtAsUSD(data.sale_price).value
}

watch([data, ixtPrice], () => {
  rows.value = (data?.nfts ?? []).map((row) => ({
    ...row,
    usd: usdPriceOrigin(row)
  }))
}, { immediate: true })

onBeforeUnmount(() => {
  activeFilters.value = []
})

watch(rows, () => {
  console.log("New rows", rows.value)
}, { deep: true })

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>