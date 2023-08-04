<template lang="pug">
Transition(name="fade" mode="out-in")
  CollectionGrid(v-if="displayType == 'grid' && !hideGrid" w="full" :is-open="showFilters")
    template(v-if="!loading")
      template(v-for="token in sortedRows")
        CollectionGridItem(:token="token" :context="context")

    template(v-else)
      CollectionGridItemSkeleton(v-for="item in items.length > ghostRows.length ? items : ghostRows")

  //- Table(v-else :columns="columns" :rows="items" :id="context" :loading="loading" :isOpen="showFilters" :selectable="true" v-model="rowsAsSelected" :context="context")

  TableNew(v-else :columns="columns" :rows="items" :id="context" :loading="loading" :isOpen="showFilters" :selectable="true" v-model="rowsAsSelected" :context="context")

    template(#item-name="{row}")
      TableCellToken(:token="row" @click="onClickItem(row)" max-w="full" :context="context")
        span(v-if="context == 'my-assets'" color="gray-200" font="normal" text="lt-md:sm") x{{ row.my_shares }}

</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken'
import type { CollectionContext } from '~/composables/useCollection'
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

</script>