<template lang="pug">
Card()
  HList()
    CardTitle(flex-grow space-y="2") 
      template(#default) {{ $t(`ixtCatRaff.claim.title`) }}
      template(#detail) {{ $t(`ixtCatRaff.claim.description`) }}
    HList(space-x="1")
      slot(name="detail")

  HList(w="full")
    CardTitle() 
      template(#detail) {{ $t(`ixtCatRaff.depositAmount.description`) }}
    HList(w="full" justify="between")
      HList()
        slot(name="box")
    Disabler(:disabled="!(claimAmount > 0)")
      ButtonGlitch(btn="~ primary-outline-cut" @click="onClick" :text="'Claim'")
</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { withdrawIXT, claimPrize } = useCatRaffStakingContract()

const { data } = defineProps<{
  data: StakingDataFragment
}>()

const onClick = () => {
  return claimPrize()
}


const claimAmount = computed(() => data?.stakingItems[0]?.userStakingData?.totalReward ?? 0)
</script>
