import { type StakingItemFragment } from "#gql";
import { type MaybeRef, get } from '@vueuse/core'

export const useStakingHelper = (item: MaybeRef<StakingItemFragment>) => {
  const sharesOwned = computed(() =>
    (get(item).userStakingData?.amountStaked ?? 0) +
    (get(item).userStakingData?.balanceOfToken ?? 0)
  )

  const sharesStakable = computed(() =>
    (get(item).userStakingData?.balanceOfToken ?? 0)
  )

  const sharesStaked = computed(() =>
    get(item).userStakingData?.amountStaked ?? 0
  )

  const canStake = computed(() =>
    (get(item).userStakingData?.balanceOfToken ?? 0) > 0
  )

  const canUnstake = computed(() =>
    (get(item).userStakingData?.amountStaked ?? 0) > 0
  )

  const canClaim = computed(() => (get(item).userStakingData?.totalReward ?? 0) > 0.01
  )

  return {
    sharesStakable,
    sharesOwned,
    sharesStaked,
    canStake,
    canUnstake,
    canClaim
  }
}