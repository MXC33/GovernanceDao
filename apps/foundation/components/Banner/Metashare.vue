<template lang="pug">
div(font="bold") METASHARE YIELD:  
HList(v-for="item in metashareStakingItems" space-x="3")
  div() {{ item?.token.tokenInfo?.title }}
  div() {{ roundToDecimals(item?.rewardPerThirtyDays) }}


</template>
      
<script lang="ts" setup>
const { metashareStakingItems } = useStakingPools()



</script>
