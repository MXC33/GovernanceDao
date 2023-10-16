
<template lang="pug">
VList(flex-shrink="0" whitespace="nowrap")

  template(v-if="column.type == 'ixt'")
    Currency(:value="value" type="ixt" v-if="!isMobile")

    VList(v-else pr="2" w="full" :items="alignOrder")
      Currency(:value="value" type="ixt")
      Currency(:value="ixtToUSD(value)" type="usd")

  Currency(:value="ixtToUSD(value)" type="usd" v-else-if="column.type == 'usd' && !isMobile")

  ContractAdress(:adress="value" v-else-if="column.type == 'contractAdress'")

  span(v-else-if="column.type == 'date'") {{ getDate(value) }}

  span(v-else-if="isYou" font="bold") {{value}}

  span(v-else) {{value}}

</template>

<script setup lang="ts" generic="Row extends TableRow">
import type { TableColumn, TableRow } from '~/composables/useTable'
import { fromUnixTime } from "date-fns"

const { column, row } = defineProps<{
  column: TableColumn<Row>,
  row: Row,
}>()


const { getValue } = useTable()
const { ixtToUSD } = useCurrencyConversion()
const { isMobile } = useDevice()

const value = computed(() => getValue(column, row))

const isYou = computed(() => value.value === 'YOU')

const getDate = (date: string | number | undefined) =>
  fromUnixTime(Number(date)).toDateString()

const alignOrder = computed(() => {
  return column.align === 'end' ? 'end' : 'start'
})

</script>
