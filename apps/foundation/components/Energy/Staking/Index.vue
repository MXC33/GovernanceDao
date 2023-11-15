<template lang="pug">
div(grid="~ md:cols-2" gap="6")
  EnergyStakingItem(:id="id", :data="data")
  EnergyPool(:id="id")
</template>
  
  
<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';


defineProps<{
  id: string,
  data: StakingDataFragment
}>()


</script>