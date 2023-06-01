
<template lang="pug">
VList(flex-shrink="0" whitespace="nowrap")
  Currency(:value="Number(value)" type="ixt" v-if="column.type == 'ixt'")

  Currency(:value="ixtToUSD(value)" type="usd" v-else-if="column.type == 'usd'")

  span(v-else-if="column.type == 'date'") {{ getDate(value) }}

  span(v-else) {{value}}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';
import { fromUnixTime } from "date-fns"

const { column, row } = defineProps<{
  column: TableColumn<Row>,
  row: Row,
}>()

const { getValue } = useTable()
const { ixtToUSD } = useIXTPrice()

const value = computed(() => getValue(column, row))

const getDate = (date: string | number | undefined) =>
  fromUnixTime(Number(date)).toDateString()

</script>
