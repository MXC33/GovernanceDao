<template lang="pug">
HList(space-x="6" font="bold") IXT Price:
  div
  div(color="green") ${{ roundToDecimals(ixtPrice) }}
  div(space-x="10")
HList(space-x="6" font="bold" ) IXT STAKING APY
  div
  HList(v-for="data in ixtPoolData" items="center" space-x="3")
    div(text="detail" ) {{ data.month }} MONTH
    div(color="green") {{ data.data && getAPY(data.data) }}%

  div
</template>
      
<script lang="ts" setup>
const { ixtPrice } = useCurrencyConversion()

const { ixtPoolData, getAPY } = useStakingPools()




</script>
  
