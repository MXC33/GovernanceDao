<template lang="pug">
div(font="bold") ENERGY YIELD PER 30 DAYS:
div() {{ roundToDecimals(energyIxtItem?.rewardPerThirtyDays,4) }}
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
