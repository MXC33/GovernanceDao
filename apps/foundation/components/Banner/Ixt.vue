<template lang="pug">
div(font="bold") IXT PRICE:  
div(color="green") ${{ roundToDecimals(ixtPrice) }}
div(font="bold") IXT STAKING APY
HList(v-for="data in ixtPoolData")
  div(text="detail") {{ data.month }} MONTH
  div(color="green") {{ data.data && getAPY(data.data) }}%


</template>
      
<script lang="ts" setup>
const { ixtPrice } = useCurrencyConversion()

const { ixtPoolData, getAPY } = useStakingPools()




</script>
  
