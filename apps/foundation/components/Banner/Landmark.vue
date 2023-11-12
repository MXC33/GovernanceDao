<template lang="pug">
div(font="bold") TOP 3 LANDMARK YIELD:  
HList(v-for="item in topLandmarkData" space-x="3")
  div() {{ item?.tokenInfo?.title}}
  div() {{ roundToDecimals(item?.tokenInfo?.dailyYield, 4) }}



</template>
      
<script lang="ts" setup>
import { LandmarkSort } from '../../.nuxt/gql/default';


const { data: topLandmarkData } = useAllLandmarkData(null, null, null, LandmarkSort.EarningHighToLow, 3)




</script>
