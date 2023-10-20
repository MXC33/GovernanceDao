<template lang="pug">
Page()
  ButtonNav() 
  PageSection(section="StakingTitle" :primary="true")
    Card()
      Table()
      ClaimHorizontal()

  PageSection(section="CorporationTitle")
    div(grid="~ cols-2 gap-6")
      MetashareCorporation(v-for="stakingItem in data?.stakingItems" :staking-data="stakingItem")

  PageSection(section="corpPerformance")
    Table()
</template>

<script lang="ts" setup>
import { StakingId } from '../../.nuxt/gql/default'

const { execute: fetchStakingData, data } = useStakingData(StakingId.Metashare)

await fetchStakingData()
console.log("data", data.value?.stakingItems)


</script>