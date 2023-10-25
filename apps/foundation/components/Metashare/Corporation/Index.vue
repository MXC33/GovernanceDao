<template lang="pug">
Card()
  MetashareCorporationImages()
  MetashareTrade(:staking-item="stakingData")
  MetashareStake()

  template(#detailBottom)
    VList(space-y="3")
      div(text="subheading") {{ $t('metashare.ClaimRewardsTitle') }}
      div(text="detail") {{ $t('metashare.ClaimRewardsRewards') }}
      div(text="subheading") 0.00

      ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('withdraw')" :text="$t('general.claim')")
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