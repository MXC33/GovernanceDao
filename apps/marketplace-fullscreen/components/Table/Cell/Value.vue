
<template lang="pug">
VList(flex-shrink="0" whitespace="nowrap")
  Currency(:value="roundToDecimals(Number(value), 4)" type="ixt" v-if="column.type == 'ixt' && !isMobile")

  Currency(:value="ixtToUSD(value)" type="usd" v-else-if="column.type == 'usd'")

  VList(v-else-if="isMobile" justify="end" items="end" pr="4")
    Currency(:value="roundToDecimals(Number(value), 4)" type="ixt")

    Currency(:value="ixtToUSD(value)" type="usd")

  ContractAdress(:adress="value" v-else-if="column.type == 'contractAdress'")

  span(v-else-if="column.type == 'date'") {{ getDate(value) }}

  span(v-else-if="isYou" font="bold") {{value}}

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
const { device, isMobile } = useDevice()

const value = computed(() => getValue(column, row))

const isYou = computed(() => value.value === 'YOU')

const getDate = (date: string | number | undefined) =>
  fromUnixTime(Number(date)).toDateString()

</script>
