<template lang="pug">
template(v-for="row in rows")
  div.table-row-item(display="contents")
    template(v-for="(column, index) in columns")
      TableCell(:sticky="getSticky(column)" :shadow="false" :last-col="index == columns.length - 1")
        template(v-if="loading")
          HelperSkeleton(h="6" flex-grow="1")

        template(v-else)

          HList(v-if="column.type == 'buttons'" w="full" space-x="3" backdrop="blur-sm")
            TableButtonGroup(v-if="isMobile")
              TableButton(:row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

            TableButton(v-else :row="row" :button="button" v-for="button in column.buttons") {{ button.text }}

          template(v-else-if="column.type == 'asset'")
            TableCellAsset(v-if="rowIsIXToken(row)" :column="column" :token="row" :scrolling="scrolledPastStart")

          slot(v-else :name="`item-${column.rowKey}`" :row="row" :column="column")
            TableCellTextValue(:column="column" :row="row")

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { CollectionContext } from '~/composables/useCollection'
import type { TableColumn, TableRow } from '~/composables/useTable'

const getSticky = (column: TableColumn<Row>) => {
  if (column.type == 'buttons')
    return 'right'
  if (column.type == 'asset')
    return 'left'
}

const { rowIsIXToken } = useTable()
const { isMobile } = useDevice()

const { rows, columns, loading, scrolledPastStart } = defineProps<{
  columns: TableColumn<Row>[],
  rows: Row[],
  scrolledPastStart?: boolean,
  scrolledPastEnd?: boolean,
  loading?: boolean,
  context?: CollectionContext
}>()

watch(() => scrolledPastStart, (value) => {
  console.log("Scroll past", value)
})
</script>