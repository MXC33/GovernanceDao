<template lang="pug">
div(grid="~ cols-2 gap-3")
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