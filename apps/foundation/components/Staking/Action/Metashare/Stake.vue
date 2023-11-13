<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Stake Metashare
  template(#default) 
    VList(space-y="default")
      InputGroup()
        template(#header) Amount
        template(#default)
          InputText(v-model.number="stakeAmount" placeholder="Enter amount" type="number" :maxAmount="sharesStakable")
            template(#suffix) {{ $t('general.share', stakeAmount)  }} 

        template(#detail) Total Balance: {{ sharesStakable }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="stakeAmount = sharesStakable") Max

      InputGroup()
        template(#header) Metashare
        template(#default) 
          InputReadonly() {{item.token.tokenInfo?.title}}

      InputGroup()
        template(#header) ToC
        template(#default) 
          StakingActionAgreement(v-model="isAgreed")

  template(#footer)
    VList()
      InputSummaryRow()
        template(#name) Metashare
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
const { loading: isLoading, execute: stakeRequest } = useContractRequest(async () => {
  return onClickStake()
})
const stakeAmount = ref(0)
const isAgreed = ref(false)

const emit = defineEmits(["close"])
const { stakeMetashare } = useMetashareStakingContract()

const { item } = defineProps<{
  item: StakingItemFragment
}>()

const { sharesStakable } = useStakingHelper(item)

const onClickStake = async () => {
  const stakingItem: UserStakingItem = {
    token: item.token,
    amount: stakeAmount.value
  }
  const staked = await stakeMetashare(stakingItem)
  if (staked)
    emit("close")
}


</script>