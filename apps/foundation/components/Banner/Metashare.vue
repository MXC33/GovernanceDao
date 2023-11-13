<template lang="pug">
BannerGroup() 
  div METASHARE 30 DAY YIELD:

  BannerGroupItem(v-for="item in metashareStakingItems")
    div(text="detail") {{ item?.token.tokenInfo?.title }}
    div() {{ roundToDecimals(item?.rewardPerThirtyDays) }} IXT

</template>
      
<script lang="ts" setup>
const { metashareStakingItems } = useStakingPools()
</script>
