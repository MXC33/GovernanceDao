<template lang="pug">
HList(space-x="6" font="bold") METASHARE 30 DAY YIELD:
  div
  HList(v-for="item in metashareStakingItems" space-x="3"  items="center")
    div(text="detail") {{ item?.token.tokenInfo?.title }}
    div() {{ roundToDecimals(item?.rewardPerThirtyDays) }} IXT

div(space-x="20")


</template>
      
<script lang="ts" setup>
const { metashareStakingItems } = useStakingPools()



</script>
