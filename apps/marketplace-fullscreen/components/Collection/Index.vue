<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="4 md:(8 b-30)" space-y="0 md:6")
  CollectionHeader() 
    template(#header) 
      slot(name="name") {{ collectionName }}

    template(#cert v-if="data?.name != null")
      CertifiedIcon(w="6")

    template(#attributes)
      AttributeList(:attributes="attributes" v-if="data")

  slot(name="menu")

  CollectionFilter(v-if="data" :items="data.nfts" :data="data" :filters="data.filters" :hide-toggle="hideGrid" @toggle-filter="toggleFilterDrawer" :context="context")

  HList(space-x="0 on-open:3" pos="relative" :open="showFilters")
    VList(display="lt-md:none")
      Transition(name="slide-left")
        CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data")

    CollectionList(v-if="data" :columns="renderColumns" :items="data?.nfts" :hide-grid="hideGrid", :context="context" :show-filters="showFilters" :loading="loading")

  slot(name="bottom")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
import CertifiedIcon from '~/assets/icons/certified.svg'

const { activeFilters } = useCollectionSettings()
const { selectedItems } = useSelection()

const { getCollectionAttributes } = useDefaulAttributes()
const attributes = computed(() => data ? getCollectionAttributes(data) : [])
const { currentTime } = useGlobalTimestamp()


const defaultColumns: TableColumn<IXToken>[] = [
  { label: "Asset", rowKey: "name", type: 'asset' },
  {
    label: "Current price", rowKey: "sale_price", type: 'ixt', sortable: {
      ascKey: 'PRICE_ASC',
      descKey: 'PRICE_DESC'
    }
  },
  {
    label: "USD price", rowKey: "sale_price", type: 'usd', sortable: {
      ascKey: 'PRICE_ASC',
      descKey: 'PRICE_DESC'
    }
  },
  {
    label: "Best offer", rowKey: "higher_bid_price", type: 'ixt'
  },
  {
    label: "Total quantity", rowKey: "shares", getValue(row) {
      if (row.shares == 0)
        return '-'
      return row.shares.toString()
    }, type: 'text'
  },
  {
    label: "Seller", rowKey: "lowest_sale.player_username", getValue(row) {
      if (!row.lowest_sale)
        return ''
      return row.lowest_sale.player_username
    }, type: 'text'
  },
  {
    label: "Time listed", rowKey: "lowest_sale.endtime", getValue(row) {
      if (!row.lowest_sale)
        return ''
      const { days, minutes } = useIntervalWithDays((row.lowest_sale.timestamp * 1000), currentTime.value)
      const optDays = days && days > 0 ? `${days} days` : ''

      return `${optDays} ${minutes} minutes`
    }, type: 'text'
  },

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
  context?: CollectionContext,
  loading?: boolean
}>()

const collectionName = computed(() => {
  if (!data)
    return ""
  return useCollectionName(data.collection)
})

onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>