<template lang="pug">
Card()
  CardTitle()
    template(#default) Wallet portfolio
    template(#detail) Track balances

  ChartBackground()

  Chart(:data="chartData")

  div(grid="~ cols-3 gap-3") 
    TitleDetail()
      template(#default) Wallet
      template(#detailBottom) 0

    TitleDetail()
      template(#default) Staked
      template(#detailBottom) 0

    TitleDetail()
      template(#default) Withdrawable
      template(#detailBottom) 0

</template>

<script lang="ts" setup>
import ChartBackground from '~/assets/images/Mask_group.svg'

defineProps<{
  chartData: number[]
}>()
//Details for Chart 
const details = [
  { title: 'Wallet', value: 0 },
  { title: 'Staked', value: 0 },
  { title: 'Withdrawable', value: 0 },
];

</script>