<template lang="pug">
Card()
  MetashareCorporationImages()
  MetashareTrade(:staking-item="stakingData")
  MetashareStake()
  Claim()
</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';

const imagePaths = [
  "~/assets/images/corporations/AstroCorp.png",
  "~/assets/images/corporations/ElabCorp.png",
  "~/assets/images/corporations/GgCorp.png",
  "~/assets/images/corporations/LuckCatCorp.png",
  "~/assets/images/corporations/NetCorp.png",
  "~/assets/images/corporations/NewLandsCorp.png",
  "~/assets/images/corporations/Y_Logo.png",
  // ... add more paths as needed
];

const { stakingData } = defineProps<{
  stakingData: StakingItemFragment | undefined
}>()



</script>