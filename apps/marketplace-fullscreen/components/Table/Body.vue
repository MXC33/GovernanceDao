<template lang="pug">
tbody(divide-y="1")
  TableRow(v-for="(row, index) in rows" :key="row.originalIndex ?? index")
    TableCell(v-if="selectable" :context="context") 
      InputCheckbox(:model-value="isSelected(index)" @update:modelValue="val => onSelect(index, val)")

    TableCell(v-for="column in columns" pos="on-buttons:(sticky right-0)" :buttons="column.type == 'buttons'") 
      template(v-if="loading")
        HelperSkeleton(h="6")

      template(v-else)
        HList(v-if="column.type == 'buttons'" space-x="3" justify="end" w="full")
          slot(:name="getColumnKey(column)" :buttons="column.buttons" :row="row" )
            TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

        slot(v-else :name="`item-${column.rowKey}`" :row="row" :column="column")
          TableCellValue(:column="column" :row="row" :context="context")


</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection';
import type { TableColumn, TableRow } from '~/composables/useTable';

const { getColumnKey } = useTable()

const { rows, columns, loading, selectable } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
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
