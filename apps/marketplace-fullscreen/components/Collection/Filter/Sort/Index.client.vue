<template lang="pug">
OptionSelect(:items="uniqueSortFields" :large="true")
  template(#header) 
    SortIcon(w="6" translate-y="-0.4" display="md:none")
    span() {{ selectedSort }}

  template(#icon)
    SortIcon()

  template(#item="{item}")
    OptionRowSelect(:selected="isSelected(item, true)" @click="onClickSelect(item.columnIndex, true, item.ascKey)" v-if="item.ascKey") {{ $t(`collection.sort.${item.ascKey}`) }}

    OptionRowSelect(:selected="isSelected(item, false)" @click="onClickSelect(item.columnIndex, false, item.descKey)" v-if="item.descKey") {{  $t(`collection.sort.${item.descKey}`) }}

</template>

<script lang="ts" setup>
import SortIcon from '~/assets/icons/sort-arrows.svg'
import type { ServerSortKey } from '~/composables/useTable';

const { t } = useI18n()

const { context } = defineProps<{
  context: string
}>()

const isAscending = computed({
  get: () => sort.value.direction == "asc",
  set: (asc) => sort.value.direction = asc ? 'asc' : 'desc'
})

type SortOpt = typeof serverSortOptions['value'][number]

const isSelected = (item: SortOpt, asc: boolean) =>
  item.columnIndex == sort.value.columnIndex &&
  asc == isAscending.value

const { serverSortOptions, sort, selectSortField, selectedSortOption } = useTableSort(context)

const selectedSort = computed(() => t(`collection.sort.${selectedSortOption.value}`))

const uniqueSortFields = computed(() =>
  serverSortOptions.value.filter((item, index, array) =>
    array.findIndex((secondItem) => item.ascKey == secondItem.ascKey || item.descKey == secondItem.descKey) == index
  )
)

const onClickSelect = (index: number, asc: boolean, key: ServerSortKey) => {
  selectSortField(index, asc ? 'asc' : 'desc', key)
}

</script>
  