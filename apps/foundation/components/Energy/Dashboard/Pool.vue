<template lang="pug">
VList()
  VList(flex-grow="1" justify="center" items="center")
    img(src="~/assets/png/EnergyIcon.png" w="32")

  Card()
    CardTitle()
      template(#default) {{$t("energy.EnergyPool.title") }}
      template(#subtitle) {{$t("energy.EpochEnds.title") }} 

    EnergyDashboardMetadata(:data="data")

    template(#detailBottom)
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('energy.ChooseStakingPool')")

</template>
  
<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';


defineProps<{
  data: StakingDataFragment
}>()


</script>