<template lang="pug">
Transition(name="fade" mode="out-in")
  CollectionGrid(v-if="displayType == 'grid' && !hideGrid" w="full" :is-open="showFilters")
    template(v-if="!loading")
      template(v-for="token in sortedRows")
        CollectionGridItem(v-if="isTokenIncluded(token.token_id, token.collection)" :token="token" :context="context" :class="gridClass")
        CollectionGridItem(v-else-if="token.collection !== planetIXAddress" :token="token" b="gray-400" :context="context" :class="gridClass")


    template(v-else)
      CollectionGridItemSkeleton(v-for="item in items.length > ghostRows.length ? items : ghostRows")

  Table(v-else :columns="columns" :rows="items" :id="context" :loading="loading" :isOpen="showFilters" :selectable="true" v-model="rowsAsSelected")

    template(#item-name="{row}")
      TableCellToken(:token="row" @click="onClickItem(row)" max-w="60")
        span(v-if="context == 'my-assets'" color="gray-200" font="normal") x{{ row.my_shares }}

</template>

<script lang="ts" setup>
import { useScreen, useGrid, extendGrid } from 'vue-screen'
import type { IXToken } from '@ix/base/composables/Token/useIXToken';
import type { CollectionContext, CollectionDisplayType } from '~/composables/useCollection';
import type { TableColumn } from '~/composables/useTable'

const { displayType } = useCollectionSettings()
const ghostRows = [1, 2, 3, 4, 5, 6, 7, 8]

const { selectedItems } = useSelection()

const rowsAsSelected = computed<number[]>({
  get: () =>
    selectedItems.value.map((item) =>
      sortedRows.value.findIndex((token) => token.token_id == item.token_id)
    ),

  set: (values: number[]) =>
    selectedItems.value = values.map((index) =>
      sortedRows.value[index]
    )
})

const { items, columns, context = 'collection', showFilters } = defineProps<{
  items: IXToken[],
  columns: TableColumn<IXToken>[],
  hideGrid?: boolean,
  showFilters: boolean,
  context: CollectionContext,
  loading?: boolean
}>()

const { sortRows } = useTable()
const { setupSortOptions, sort } = useTableSort(context)
const sortedRows = computed(() => sortRows(columns, items, sort.value))

watch(() => columns, () => setupSortOptions(columns), { immediate: true })

const onClickItem = (row: IXToken) => {
  const { network, collection, token_id } = row
  navigateTo(`/assets/${network}/${collection}/${token_id}`)
}

const planetIXAddress = '0xba6666b118f8303f990f3519df07e160227cce87'

const isTokenIncluded = (tokenId: number, tokenCollection: string) => {
  const excludedTokenIds = [9698762, 26, 29, 34]
  const targetCollectionAddress = '0xba6666b118f8303f990f3519df07e160227cce87'
  return !excludedTokenIds.includes(tokenId) && tokenCollection === targetCollectionAddress
}

const grid = useGrid(extendGrid('tailwind', {
  sm: 350
}))

const screen = useScreen()
console.log(screen, 'screen')
console.log(grid.breakpoint, '- breakpoint')


const gridClass = computed(() => {
  if (showFilters && grid.breakpoint == '2xl') {
    return 'collection-grid-item-open'
  } else if (!showFilters && grid.breakpoint == '2xl') {
    return 'collection-grid-item'
  } else if (showFilters && grid.breakpoint == 'xl') {
    return 'collection-grid-item-xl-open'
  } else if (!showFilters && grid.breakpoint == 'xl') {
    return 'collection-grid-item-xl'
  } else if (showFilters && grid.breakpoint == 'lg') {
    return 'collection-grid-item-xl-open'
  } else if (!showFilters && grid.breakpoint == 'lg') {
    return 'collection-grid-item-xl'
  } else if (showFilters && grid.breakpoint == 'md') {
    return 'collection-grid-item-md-open'
  } else if (!showFilters && grid.breakpoint == 'md') {
    return 'collection-grid-item-md'
  } else if (showFilters && grid.breakpoint == 'sm') {
    return 'collection-grid-item-sm'
  } else if (!showFilters && grid.breakpoint == 'sm') {
    return 'collection-grid-item-sm'
  }
})

</script>

<style>
.collection-grid-item:nth-child(5n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0.5px solid #636363;
}

.collection-grid-item:nth-child(5n + 4) {
  border-left: 0.5px solid #636363;
  border-right: 0.5px solid #636363;
}

.collection-grid-item-open:nth-child(4n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0.5px solid #636363;
}

.collection-grid-item-open:nth-child(4n + 3) {
  border-left: 0px;
  border-right: 0.5px solid #636363;
}

/* @media only screen and (max-width: 1440px) */
.collection-grid-item-xl:nth-child(4n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0px;
}

.collection-grid-item-xl:nth-child(4n + 3) {
  border-left: 0.5px solid #636363;
  border-right: 0.5px solid #636363;
}

.collection-grid-item-xl-open:nth-child(3n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0.5px solid #636363;
}

/* @media only screen and (max-width: 768px)  */
.collection-grid-item-md:nth-child(3n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0px;
}

.collection-grid-item-md:nth-child(3n + 3) {
  border-left: 0.5px solid #636363;
  border-right: 0px;
}

.collection-grid-item-md-open:nth-child(2n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0px;
}

/* @media only screen and (max-width: 425px)  */
.collection-grid-item-sm:nth-child(2n + 2) {
  border-left: 0.5px solid #636363;
  border-right: 0px;
}
</style>