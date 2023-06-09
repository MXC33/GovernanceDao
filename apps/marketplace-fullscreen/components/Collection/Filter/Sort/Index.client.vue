<template lang="pug">
OptionSelect(:items="sortOptions" v-if="sortOptions" :large="true")
  template(#header) {{ selectedSortOption?.label }}

  template(#icon)
    SortIcon()

  template(#beforeItems)
    OptionRow(@click="isAscending = !isAscending")
      HList(space-x="3" items="center")
        FormCheckbox(v-model="isAscending")

        Transition(name="fade" mode="out-in")
          div(v-if="isAscending") Ascending
          div(v-else) Descending

  template(#item="{item}")
    OptionRowSelect(:selected="sort.columnIndex == item.columnIndex" @click="selectSortField(item.columnIndex)") {{ item.label }}
    //{{ $t(`collection.sort.${getSortKey(item)}`) }}

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


const { sortOptions, sort, selectSortField, selectedSortOption } = useTableSort(context)

</script>
  