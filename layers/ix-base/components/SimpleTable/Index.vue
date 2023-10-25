<template lang="pug">
VList.no-scrollbar(overflow-x="auto" width="100%")
  VList(flex-grow="1" bg="gray-900")
    header(grid="~ row-gap-0 gap-x-3" :style="gridStyles" p="x-6 y-3" text="detail")
      div(v-for="col in columns") {{ col.title ?? col.id }}

    Divider()

    VList(p="x-6")
      template(v-for="row, rowIndex in rows" )
        div(grid="~ row-gap-0 gap-x-3" py="3" :style="gridStyles") 
          VList(v-for="col, colIndex in columns" justify="center") 
            slot(v-if="col.id && $slots['col-' + col.id]" :row="row.items[colIndex]" :index="rowIndex" :name="'col-' + col.id")

            template(v-else) {{ row.items[colIndex] }}

        Divider(mx="-6" display="last:none")

    Divider()

    VList(flex-grow="1" bg="gray-900")
      header(grid="~ row-gap-0 gap-x-3" :style="gridStyles" p="x-6 y-3")
        VList(v-for="col, colIndex in columns")
          slot(v-if="col.id && $slots['footer-col-' + col.id]" :index="colIndex" :name="'footer-col-' + col.id")

</template>

<script lang="ts" setup>
import type { SimpleTableColumn, SimpleTableRow } from 'composables/useSimpleTable';

const { columns } = defineProps<{
  columns: SimpleTableColumn[],
  rows: SimpleTableRow[]
}>()

const { getColStyles } = useSimpleTable()

const gridStyles = computed(() => getColStyles(columns))
</script>
