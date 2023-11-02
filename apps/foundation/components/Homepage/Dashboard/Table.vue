<template lang="pug">
Card(class="overflow-hidden")
  CardTitle() {{ $t(`index.tableHead`) }}
  SimpleTable(:rows="rows" :columns="columns" mx="-6" mb="!-6")
    template(#col-asset="{index}") 
      HList(items="center" space-x="3") 
        img(:src="`/assets/staking/${dashboardTableData[index].id}.png`" w="6" )
        div(capitalize="~" ) {{ dashboardTableData[index].id }}


    template(#footer-col-asset) 
      span( text="gray-300") Total

    template(#footer-col-daily) 
      HList(items="center" space-x="1" font="bold")
        div() {{ roundToDecimals(totalDaily) }}
        Icon(icon="ixt")

    template(#footer-col-30days) 
      HList(items="center" space-x="1" font="bold")
        div {{ roundToDecimals(total30Day) }}
        Icon(icon="ixt")
</template>
  
  
<script lang="ts" setup>
import type { SimpleTableRow, SimpleTableColumn } from '@ix/base/composables/useSimpleTable';

const { dashboardTableData } = useStakingPools()

const totalDaily = computed(() => dashboardTableData.value.reduce((a, b) => a + b.daily, 0))

const total30Day = computed(() => dashboardTableData.value.reduce((a, b) => a + b.thirtyDays, 0))

const rows = computed<SimpleTableRow[]>(() =>
  dashboardTableData.value.map((item) => ({
    items: [
      item.id,
      roundToDecimals(item.daily, 5),
      roundToDecimals(item.thirtyDays, 5)
    ]
  }))
)
const columns: SimpleTableColumn[] = [
  { title: "Asset", id: "asset" },
  { title: "1 day", id: "daily" },
  { title: "30 days", id: "30days" },
]


</script>
