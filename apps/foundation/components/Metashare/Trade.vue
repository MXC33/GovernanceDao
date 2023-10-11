<template lang="pug">
CardSection(title="Trade")
  p Share: {{stakingItem?.totalStaked}}
  p IXT per share 30 days: [Dynamic Value]
  template(#buttons) 
    button(btn="~ primary-outline") VIEW ON MARKETPLACE

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { stakingItem } = defineProps<{
  stakingItem: StakingItemFragment | undefined
}>()



</script>