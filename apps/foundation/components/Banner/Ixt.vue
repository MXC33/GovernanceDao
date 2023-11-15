<template lang="pug">
BannerGroupItem(font="bold")
  div IXT Price:
  div(color="green") ${{ roundToDecimals(ixtPrice) }}
  div(space-x="10")

BannerGroup() 
  div IXT STAKING APY:
  BannerGroupItem(v-for="data in ixtPoolData")
    div(text="detail" ) {{ data.month }} MONTH
    div(color="green") {{ data.data && getAPY(data.data) }}%

</template>
      
<script lang="ts" setup>
const { ixtPrice } = useCurrencyConversion()

const { ixtPoolData, getAPY } = useStakingPools()




</script>
  
