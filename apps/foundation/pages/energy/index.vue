<template lang="pug">
Page()
  ButtonNav()

  PageSection(section="Staking" :primary="true")
    EnergyDashboard

  PageSection(section="EnergyForIXT")
    EnergyStaking(id="energy" :data="energyData" v-if="energyData")

  PageSection(section = "AmeliaFoundation")
    EnergyStaking(id="amelia" :data="ameliaData" v-if="ameliaData")
</template>

<script lang="ts" setup>
import { StakingId } from '~/.nuxt/gql/default';

const { data: ameliaData } = useStakingData(StakingId.EnergyAmelia)
const { data: energyData } = useStakingData(StakingId.Energy)

</script>

<style>
.imgBox {
  flex: display;
  align-items: center;
}
</style>