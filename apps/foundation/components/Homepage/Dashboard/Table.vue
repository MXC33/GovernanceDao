<template lang="pug">
Card()
  SimpleTable(:rows="rows" :columns="columns" pb="3")
    template(#row-asset="{index}") 
      HList(items="center" space-x="3") 
        img(:src="`/assets/staking/${dashboardTableData[index].id}.png`" w="6")
        div(capitalize="~") {{ dashboardTableData[index].id }}

</template>
  
  
<script lang="ts" setup>
import IXTIcon from '~/assets/images/tokenBG.svg'

import type { SimpleTableRow, SimpleTableColumn } from '@ix/base/composables/useSimpleTable';

const { dashboardTableData } = useStakingPools()


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
  { title: "1 day", },
  { title: "30 days", },
]


</script>
