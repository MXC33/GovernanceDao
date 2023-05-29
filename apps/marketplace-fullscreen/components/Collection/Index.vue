<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="8" space-y="6" )
  CollectionHeader() 
    template(#header) 
      slot(name="name")

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  slot(name="menu")

  HelperBorderScroll(pos="sticky top-33")
  CollectionFilter(:items="data.nfts" :filters="data.filters" v-if="data"  @toggle-filter="toggleFilterDrawer" :hide-toggle="isBids")

  HList(space-x="0 on-open:3" pos="relative" :open="showFilters")
    VList(pos="sticky top-48")
      Transition(name="slide-left")
        CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data")

    Transition(name="fade" mode="out-in" v-if="data")

      CollectionGrid(v-if="displayType == 'grid' && !hideGrid" w="full" :is-open="showFilters")
        CollectionGridItem.collection-grid-item(:token="token" v-for="token in data.nfts" b="gray-400")

      Table(:columns="columns" :rows="rows" v-else id="collection" :has-button="tableType")
        template(#item-name="{row}")
          HList(items="center" space-x="2" font="bold")
            div(w="12" h="12")
              TokenImage(:token="row" w="12" h="12" :key="getTokenKey(row)")
            TokenName(:token="row" capitalize="~" :key="getTokenKey(row)")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="cartItems.length > 0")
</template>

<script lang="ts" setup>
import type { ButtonTypes, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'

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

const isBids = computed(() => tableType == 'incoming' || tableType == 'outgoing')
const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
}

const isFilterActive = computed(() => {
  if (showFilters.value = true)
    return true
})

const { data, tableType } = defineProps<{
  data?: CollectionData,
  hideGrid?: boolean
  tableType?: ButtonTypes
}>()


watch(rows, () => {
  console.log("New rows", rows.value)
}, { deep: true })

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>