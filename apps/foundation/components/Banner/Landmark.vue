<template lang="pug">
HList(font="bold" space-x="6") TOP 6 LANDMARK YIELD: 
  div
  HList(v-for="item in topLandmarkData" space-x="3" items="center")
    div(text="detail") {{ item?.tokenInfo?.title}}
    div() {{ roundToDecimals(item?.tokenInfo?.dailyYield, 4) }} IXT

div(space-x="20")

</template>
      
<script lang="ts" setup>
import { LandmarkSort } from '../../.nuxt/gql/default';


const { data: topLandmarkData } = useAllLandmarkData(null, null, null, LandmarkSort.EarningHighToLow, 3)




</script>
