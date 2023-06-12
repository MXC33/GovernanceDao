<template lang="pug">
OptionSelect(:items="serverSortOptions" v-if="serverSortOptions" :large="true")
  template(#header) {{ selectedSortOption?.label }}

  template(#icon)
    SortIcon()

  template(#item="{item}")
    OptionRowSelect(:selected="sort.columnIndex == item.columnIndex" @click="selectSortField(item.columnIndex)") {{ item.label }}

    OptionRowSelect(:selected="sort.columnIndex == item.columnIndex" @click="selectSortField(item.columnIndex)") {{ item.label }}

</template>

<script lang="ts" setup>
import SortIcon from '~/assets/icons/sort-arrows.svg'

const { context } = defineProps<{
  context: string
}>()

const isAscending = computed({
  get: () => sort.value.direction == "asc",
  set: (asc) => sort.value.direction = asc ? 'asc' : 'desc'
})


const { serverSortOptions, sort, selectSortField, selectedSortOption } = useTableSort(context)

</script>
  