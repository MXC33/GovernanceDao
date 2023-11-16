<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Stake Energy
  template(#default) 
    VList(space-y="default")
      InputGroup()
        template(#header) Amount
        template(#default)
          InputText(v-model.number="stakeAmount" placeholder="Enter amount" type="number" :maxAmount="maxEnergyStakable")
            template(#suffix) {{ $t('general.amount', stakeAmount)  }} 

        template(#detail) Total Balance: {{ sharesStakable }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="stakeAmount = sharesStakable") Max

      InputGroup()
        template(#header) Energy
        template(#default) 
          InputReadonly() {{item.token.tokenInfo?.title}}

      InputGroup(v-if="id == 'amelia'")
        template(#header) Amelia Contribution
        template(#default) 
          InputReadonly() 10 %

      InputGroup()
        template(#header) ToC
        template(#default) 
          StakingActionAgreement(v-model="isAgreed")

  template(#footer)
    VList()
      InputSummaryRow()
        template(#name) Energy
        template(#value) {{item.token.tokenInfo?.title}}

      InputSummaryRow(:primary="true")
        template(#name) Stake amount
        template(#value) 
          StakingActionTotalAmount(:amount="stakeAmount" i18n="share")

  template(#buttons)
    Disabler(:disabled="!isAgreed || stakeAmount == 0")
      ButtonInteractive(@click="stakeRequest" text="Stake" :loading="isLoading" :loading-text="'Staking...'")

</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';
import type { UserStakingItem } from 'composables/useStakingPools';
const { loading: isLoading, execute: stakeRequest } = useContractRequestFnd(async () => executeStake(), 'stake')

const { maxEnergyStakable } = useStakingPools()
const stakeAmount = ref(0)
const isAgreed = ref(false)

const emit = defineEmits(["close"])
const { stakeEnergy, stakeAmeliaEnergy } = useEnergyStakingContract()

const { item, id } = defineProps<{
  item: StakingItemFragment
  id: 'amelia' | 'energy'
}>()

console.log("item", item)

const { sharesStakable } = useStakingHelper(computed(() => item))

const executeStake = async () => {
  const stakingItem: UserStakingItem = {
    token: item.token,
    amount: stakeAmount.value
  }

  if (id == 'amelia')
    await onStakeAmelia(stakingItem)
  if (id == 'energy')
    await onStakeEnergy(stakingItem)
}

const onStakeEnergy = async (item: StakingItemFragment) => {
  const staked = await stakeEnergy(item)

  if (staked)
    emit("close")
}

const onStakeAmelia = async (item: StakingItemFragment) => {
  const staked = await stakeAmeliaEnergy(item)

  if (staked)
    emit("close")
}


</script>