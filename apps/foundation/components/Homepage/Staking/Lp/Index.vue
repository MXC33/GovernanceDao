<template lang="pug">
div(grid="~ md:cols-2 gap-6")
  HomepageStakingLpItem(type="usdt" :pool="lpUsdtData" v-if="lpUsdtData")
  HomepageStakingLpItem(type="matic" :pool="lpMaticData" v-if="lpMaticData")

</template>

<script lang="ts" setup>
import { StakingId } from '~/.nuxt/gql/default';

const { data: lpMaticData } = useStakingData(StakingId.LpMATIC)
const { data: lpUsdtData } = useStakingData(StakingId.LpUSDT)

</script>