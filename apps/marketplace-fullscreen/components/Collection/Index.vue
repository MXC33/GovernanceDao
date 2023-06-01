<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="4 t-4 b-30 md:8 b-30" space-y="6")
  CollectionHeader() 
    template(#header) 
      slot(name="name") {{ collectionName }}

    template(#cert v-if="data?.name != null")
      CertifiedIcon(w="6")

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  slot(name="menu")

  CollectionFilter(:items="data.nfts" :filters="data.filters" :hide-toggle="hideGrid" v-if="data"  @toggle-filter="toggleFilterDrawer")

  HList(space-x="0 on-open:3" pos="relative" :open="showFilters")
    VList(pos="sticky top-48")
      Transition(name="slide-left")
        CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data")

    CollectionList(:columns="renderColumns" :items="data?.nfts" v-if="data" :hide-grid="hideGrid", :context="context" :show-filters="showFilters")

  slot(name="bottom")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="selectedItems.length > 0" :context="context")
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
// import PolygonIcon from '~/assets/icons/polygon_filled.svg'
import CertifiedIcon from '~/assets/icons/certified.svg'

const { activeFilters } = useCollectionSettings()
const { selectedItems } = useSelection()

const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => data ? getCollectionAttributes(data) : [])

const defaultColumns: TableColumn<IXToken>[] = [
  { label: "Asset", rowKey: "name", type: 'asset' },
  { label: "Current price", rowKey: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", rowKey: "sale_price", type: 'usd', sortable: true },
  { label: "Best offer", rowKey: "higher_bid_price", type: 'ixt', sortable: true },
]

const renderColumns = computed(() => columns ?? defaultColumns)

const showFilters = ref(false)

const toggleFilterDrawer = () => {
  showFilters.value = !showFilters.value
  console.log(showFilters.value)
}

const { data, columns, context = 'collection' } = defineProps<{
  data?: CollectionData,
  columns?: TableColumn<IXToken>[],
  hideGrid?: boolean,
  context?: CollectionContext
}>()

const collectionName = computed(() => {
  if (data?.name == "PlanetIX Assets")
    return "PlanetIX - Assets"

  if (context != 'collection')
    return "My Assets"

  return data?.name
})

onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>