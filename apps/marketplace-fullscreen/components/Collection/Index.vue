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
const { selectedItems } = useSelection()

const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => data ? getCollectionAttributes(data) : [])

const defaultColumns: TableColumn<IXToken>[] = [
  { label: "Asset", type: 'asset' },
  { label: "Current price", rowKey: "sale_price", type: 'ixt', sortable: true },
  { label: "USD price", rowKey: "sale_price", type: 'usd', sortable: true },
  { label: "Best offer", rowKey: "higher_bid_price", type: 'ixt', sortable: true },
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


onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>

<style>
.collection-grid-item:nth-child(5n + 6) {
  border: 0px;
}
</style>