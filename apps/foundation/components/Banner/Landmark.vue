<template lang="pug">
BannerGroup()
  div TOP 6 LANDMARK YIELD: 
  BannerGroupItem(v-for="item in topLandmarkData")
    div(text="detail") {{ item?.tokenInfo?.title}}
    div() {{ roundToDecimals(item?.tokenInfo?.dailyYield, 4) }} IXT

</template>
      
<script lang="ts" setup>
import { LandmarkSort } from '../../.nuxt/gql/default';


const { data: topLandmarkData } = useAllLandmarkData(null, null, null, LandmarkSort.EarningHighToLow, 3)




</script>
