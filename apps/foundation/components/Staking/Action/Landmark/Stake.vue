<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Stake Landmark
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
        template(#header) Landmark
        template(#default) 
          InputReadonly() {{item.token.tokenInfo?.title}}

      InputGroup()
        template(#header) ToC
        template(#default) 
          StakingActionAgreement(v-model="isAgreed")

  template(#footer)
    VList()
      InputSummaryRow()
        template(#name) Landmark
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
import type { UserStakingItem } from '@ix/base/composables/Contract/useStakingData';
const { loading: isLoading, execute: stakeRequest } = useContractRequestFnd(async () => {
  return onClickStake()
})

const stakeAmount = ref(0)
const isAgreed = ref(false)

const emit = defineEmits(["close"])
const { stakeLandmark } = useLandmarkStakingContract()

const { item } = defineProps<{
  item: StakingItemFragment
}>()

const { sharesStakable } = useStakingHelper(computed(() => item))

const onClickStake = async () => {
  const stakingItem: UserStakingItem = {
    token: item.token,
    amount: stakeAmount.value
  }
  const staked = await stakeLandmark(stakingItem)
  if (staked)
    emit('close')
}


</script>