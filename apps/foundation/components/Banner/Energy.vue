<template lang="pug">
HList(font="bold" space-x="6") ENERGY 30 DAY YIELD:
  div
  div() {{ roundToDecimals(energyIxtItem?.rewardPerThirtyDays,4) }} IXT
  div
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
