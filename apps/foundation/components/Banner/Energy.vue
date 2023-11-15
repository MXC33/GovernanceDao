<template lang="pug">
BannerGroupItem(font="bold") 
  div ENERGY 30 DAY YIELD:
  div() {{ roundToDecimals(energyIxtItem?.rewardPerThirtyDays,4) }} IXT
</template>
      
<script lang="ts" setup>

const { energyStakingItems } = useStakingPools()

const energyIxtItem = computed(() => {
  if (energyStakingItems.value) {
    return energyStakingItems.value[0]
  }
  return null
})

</script>
