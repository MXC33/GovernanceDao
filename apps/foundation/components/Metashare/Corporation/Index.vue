<template lang="pug">
Card()
  MetashareCorporationImages(:src="imageSrc")
  MetashareTrade(:staking-item="stakingData")
  MetashareStake()
  Claim()
</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { stakingData } = defineProps<{
  stakingData: StakingItemFragment | undefined
}>()



</script>