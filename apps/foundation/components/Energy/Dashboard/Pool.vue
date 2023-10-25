<template lang="pug">
VList()
  VList(flex-grow="1" justify="center" items="center")
    img(src="~/assets/png/EnergyIcon.png" w="32")

  Card()
    CardTitle()
      template(#default) {{$t("energy.EnergyPool") }}
      template(#subtitle) {{$t("energy.EpochEnds") }} {{ epochEnds }}

    EnergyDashboardMetadata(:data="data")

    template(#detailBottom)
      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('energy.ChooseStakingPool')")

</template>
  
<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { data } = defineProps<{
  data: StakingDataFragment
}>()

const currentTime = useTimestamp()

const epochEnds = computed(() => {
  const endTime = data.epochEndtime
  if (!endTime)
    return 0

  const { days, hours, minutes, seconds } = useIntervalWithDays(currentTime.value, endTime * 1000)
  return `${days}D ${hours}H ${minutes}M ${seconds}S`
})

console.log("Data", data.epochEndtime)
</script>