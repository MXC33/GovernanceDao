<template lang="pug">
VList(space-y="3")
  HList(space-x="3")
    TitleDetail()
      template(#detail) Staked since
      template(#default) {{ formattedDate }}

  div(grid="~ cols-2" space-x="3")
    ButtonInteractive(btn="~ primary-outline-cut on-disabled:disabled" @click="stakeRequest" :text="$t('general.stake')" :disabled="staked" :loading="isLoadingStake" :loading-text="'Staking...'")
    ButtonInteractive(btn="~ primary-outline-cut on-disabled:disabled" @click="unstakeRequest" :text="$t('general.unstake')" :disabled="!staked" :loading="isLoadingUnstake" :loading-text="'Unstaking...'")

</template>
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';
import type { NftFragment } from '#gql';
import { format } from 'date-fns'

const { loading: isLoadingStake, execute: stakeRequest } = useContractRequestFnd(() => stake())

const { loading: isLoadingUnstake, execute: unstakeRequest } = useContractRequestFnd(() => unstake())

const { stakeTerritory, unstakeTerritory } = useTerritoryStakingContract()

const { item, staked } = defineProps<{
  staked: boolean
  item: StakingItemFragment | NftFragment
}>()


const formattedDate = computed(() => staked ? format(item.userStakingData?.stakedAt * 1000 ?? 0, 'dd-MM-yyyy') : "-")

const token: NftFragment = staked ? item?.token : item


const stake = async () => {
  return await stakeTerritory(token)
}

const unstake = async () => {
  return await unstakeTerritory(token)
}


</script>