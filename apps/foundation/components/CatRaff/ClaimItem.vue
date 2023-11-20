<template lang="pug">
CatRaffItem()
  template(#title) {{ $t(`ixtcatraff.claim.title`) }}
  template(#description) {{ $t(`ixtcatraff.claim.description`) }}
  template(#counter)
    HList(space-x="1")
      slot(name="detail")

  template(#footer)
    HList(w="full" space-x="3")
      VList(w="full" space-y="1")
        p(text="detail") {{ $t(`ixtcatraff.depositAmount.description`) }}

        HList()
          slot(name="box")

      Disabler(:disabled="!(claimAmount > 0)")
        ButtonInteractive(btn="~ primary-outline-cut" @click="claimRequest" :text="'Claim'" :loading="isLoading" :loading-text="'Claiming...'")
</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const { withdrawIXT, claimPrize } = useCatRaffStakingContract()
const { loading: isLoading, execute: claimRequest } = useContractRequestFnd(() => onClick(), 'claim')
const { data } = defineProps<{
  data: StakingDataFragment
}>()

const onClick = () => {
  return claimPrize()
}


const claimAmount = computed(() => data?.stakingItems[0]?.userStakingData?.totalReward ?? 0)
</script>
