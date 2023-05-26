<template lang="pug">
// TEST BULK LISTINGS
button(btn="~ primary" w="full" m="t-5" @click.prevent="listItems") Bulk List
pre(v-if="testSaleItems" ) {{testSaleItems.length}}
p(v-if="testSaleItemsData" ) {{testSaleItemsData}}
// END TEST BULK LISTINGS
VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6")
  MyAssetsHeader()
    template(#header)
      slot(name="name")

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  MyAssetsMenu()
  HelperBorderScroll()
  CollectionFilter(:items="data.nfts" :filters="data.filters" v-if="data"  @toggle-filter="toggleFilterDrawer")

  HList(space-x="3" pos="relative")
    VList(pos="sticky top-48")
      Transition(name="slide-left")
        CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data")

    Transition(name="fade" mode="out-in" v-if="data")
      CollectionGrid(v-if="displayType == 'grid'" w="full")
        CollectionGridItem.collection-grid-item(:token="token" v-for="token in data.nfts" b="gray-400")

      Table(:columns="columns" :rows="rows" v-else id="collection")
        template(#item-name="{row}")
          HList(items="center" space-x="2" font="bold")
            div(w="12" h="12")
              TokenImage(:token="row" w="12" h="12" :key="getTokenKey(row)")
            TokenName(:token="row" capitalize="~" :key="getTokenKey(row)")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="cartItems.length > 0")
</template>

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
import {useListing} from "~/composables/useListing";
import type {SingleItemData} from "@ix/base/composables/Token/useIXToken";

const { displayType } = useCollectionSettings()
const { getTokenKey } = useTokens()
const { cartItems } = useCart()
const { ixtAsUSD } = useIXTPrice()

const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => data ? getCollectionAttributes(data) : [])


const rows = computed(() => (data?.nfts ?? []).map((row) => ({
  ...row,
  usd: ixtAsUSD(row.sale_price).value
})))

type Row = typeof rows.value[number]

const columns: TableColumn<Row>[] = [
  { label: "Asset", value: "name" },
  { label: "Current price", value: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", value: "usd", type: 'usd', sortable: true },
  { label: "Best offer", value: "higher_bid_price", type: 'ixt', sortable: true },
]


const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
}

const { data } = defineProps<{
  data?: CollectionData,
}>()


watch(rows, () => {
  console.log("New rows")
}, { deep: true })


/** TEST BULK LISTINGS **/
const testSaleItems = computed(() => {
  const testData = []
  let i = 0
  for (const nft of data?.nfts) {
    testData.push(nft)
    i++
    if (i > 2) break
  }
  return testData
})

const testSaleItemsData = computed(() => {
  const testData = new Map()
  for (const item of testSaleItems.value) {
    testData.set(item.token_id, {
      price: 10,
      shares: 1,
      endTime: 1685535351
    })
  }
  return testData
})

const listItems = async () => {
  const listing = useListing()
  const list = await listing.bulkList(testSaleItems.value as SingleItemData[], testSaleItemsData.value)
  console.log('List result', list)
}

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>
