<template lang="pug">
ClientOnly()
  VList()
    div(flex-grow="1")

    Card()
      CardTitle()
        template(#default) {{$t("energy.EnergyPool") }}
        template(#subtitle) {{$t("energy.EpochEnds") }} {{ epochEnds }}

      EnergyDashboardMetadata(:data="data")


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

</script>