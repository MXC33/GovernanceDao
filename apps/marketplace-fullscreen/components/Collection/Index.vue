<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" p="4 md:(8 b-30)" space-y="0 md:6" )
  CollectionHeader(:context="context") 
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
      CollectionFilterSlideout(:items="data.filters" v-if="showFilters && data")

    CollectionList(v-if="data" :columns="renderColumns" :items="data?.nfts" :hide-grid="hideGrid", :context="context" :show-filters="showFilters" :loading="loading")

  HList(justify="center" w="full" py="2" v-if="loadMoreVisible")
    ButtonInteractive(btn="~ primary " font="bold" @click="loadNextPage" :text="loading ? 'Loading' : 'Load More'" :loading="loading" w="80" ref="loadMoreButton")

  Transition(name="slide-bottom")
    CollectionSelectBar(v-if="selectedItems?.length > 0" :context="context")

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionData } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'
import CertifiedIcon from '~/assets/icons/certified.svg'

const { activeFilters } = useCollectionSettings()
const { getCollectionAttributes } = useDefaulAttributes()
const { currentTime } = useGlobalTimestamp()
const { selectedItems } = useSelection()

const loadMoreButton = ref<HTMLElement | null>(null)
const showFilters = shallowRef(false)

const emit = defineEmits(["loadNextPage"])
const loadNextPage = () => emit("loadNextPage")

useScrollLoadMore(loadMoreButton, loadNextPage)

const attributes = computed(() => data ? getCollectionAttributes(data) : [])
const renderColumns = computed(() => columns ?? defaultColumns)

const defaultColumns: TableColumn<IXToken>[] = [
  { label: "Asset", rowKey: "name", type: 'asset', width: 200 },
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


const toggleFilterDrawer = () =>
  showFilters.value = !showFilters.value

const { data, columns, context = 'collection' } = defineProps<{
  data?: CollectionData,
  columns?: TableColumn<IXToken>[],
  hideGrid?: boolean,
  context?: CollectionContext,
  loading?: boolean
}>()

const loadMoreVisible = computed(() => {
  const pageKey = Number(data?.page_key ?? null)
  return pageKey > 0
})


const collectionName = computed(() => {
  if (!data)
    return ""
  return useCollectionName(data.collection)
})

onBeforeUnmount(() => {
  activeFilters.value = []
})

</script>

<style>
.no-scroll {
  overflow: hidden;
}
</style>