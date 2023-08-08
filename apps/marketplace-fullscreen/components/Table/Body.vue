<template lang="pug">
template(v-for="(row, index) in rows" :key="row.originalIndex ?? index")
  TableCellWrapper(v-if="selectable" :context="context" justify="center" pos="sticky left-0" bg="gray-900" z="2" shadow="on-scrolled:right" :scrolled="scrolledPastStart" transition="all")
    InputCheckbox(:model-value="isSelected(index)" @update:modelValue="val => onSelect(index, val)")

  TableCell(v-for="column in columns" :sticky="column.type == 'buttons'" :shadow="false") 
    template(v-if="loading")
      HelperSkeleton(h="6" flex-grow="1" mr="6")

    template(v-else)

      HList(v-if="column.type == 'buttons'" w="full" space-x="3" pr="4" backdrop="blur-sm")
        TableButtonGroup(v-if="isMobile")
          TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

        TableButton(v-else :row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

      slot(v-else :name="`item-${column.rowKey}`" :row="row" :column="column")
        TableCellValue(:column="column" :row="row" :context="context")
</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { TableColumn, TableRow } from '~/composables/useTable'

const { getColumnKey } = useTable()

const { isMobile } = useDevice()

const { rows, columns, loading, selectable } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  scrolledPastStart?: boolean,
  scrolledPastEnd?: boolean,
  loading?: boolean,
  selectable?: boolean,
  context?: CollectionContext
}>()

const selectedItems = defineModel<number[]>()

const isSelected = (index: number) =>
  selectedItems.value?.includes(index)

const onSelect = (index: number, val: boolean) => {
  if (!selectedItems.value)
    return

  const hasItem = selectedItems.value.indexOf(index) > -1

  if (hasItem && !val)
    return selectedItems.value = selectedItems.value.filter((item) => item != index)

  if (val && !hasItem)
    return selectedItems.value = [...selectedItems.value, index]
}

</script>