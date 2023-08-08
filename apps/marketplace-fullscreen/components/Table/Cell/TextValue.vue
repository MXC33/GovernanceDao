
<template lang="pug">
VList(flex-shrink="0" whitespace="nowrap" p="md:r-6" flex-grow="lt-md:1")
  // Move asset type in here and combine with selected 

  Currency(:value="roundToDecimals(Number(value), 4)" type="ixt" v-if="column.type == 'ixt' && !isMobile")

  Currency(:value="ixtToUSD(value)" type="usd" v-else-if="column.type == 'usd' && !isMobile")

  VList(v-else-if="isMobile && context == 'collection'" pr="4" w="full" items="end")
    Currency(:value="roundToDecimals(Number(value), 4)" type="ixt")

    Currency(:value="ixtToUSD(value)" type="usd")

  ContractAdress(:adress="value" v-else-if="column.type == 'contractAdress'")

  span(v-else-if="column.type == 'date' && !isMobile") {{ getDate(value) }}

  span(v-else-if="isYou" font="bold") {{value}}

  span(v-else) {{value}}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable';
import { fromUnixTime } from "date-fns"
import type { CollectionContext } from '~/composables/useCollection';

const { column, row, context } = defineProps<{
  column: TableColumn<Row>,
  row: Row,
  context?: CollectionContext
}>()

const { getValue } = useTable()
const { ixtToUSD } = useIXTPrice()
const { isMobile } = useDevice()

const value = computed(() => getValue(column, row))

const isYou = computed(() => value.value === 'YOU')

const getDate = (date: string | number | undefined) =>
  fromUnixTime(Number(date)).toDateString()

</script>
