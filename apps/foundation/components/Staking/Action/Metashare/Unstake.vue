<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Unstake Metashare
  template(#default) 
    VList(space-y="default")
      InputGroup()
        template(#header) Amount
        template(#default)
          InputText(v-model.number="unstakeAmount" placeholder="Enter amount" type="number" :maxAmount="sharesStaked")
            template(#suffix) {{ $t('general.share', unstakeAmount)  }} 

        template(#detail) Amount staked: {{ sharesStaked }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="unstakeAmount = sharesStaked") Max

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
        template(#name) Unstake amount
        template(#value) 
          StakingActionTotalAmount(:amount="unstakeAmount" i18n="share")

  template(#buttons)
    Disabler(:disabled="!isAgreed || unstakeAmount == 0")
      ButtonInteractive(@click="stakeRequest" text="Unstake" :loading="isLoading" :loading-text="'Unstaking...'") 

</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';
import type { UserStakingItem } from '@ix/base/composables/Contract/useStakingData';
const { loading: isLoading, execute: stakeRequest } = useContractRequest(async () => {
  return onClickUnstake()
})

const { unstakeMetashare } = useMetashareStakingContract()

const unstakeAmount = ref(0)

const emit = defineEmits(["close"])
const isAgreed = ref(false)

const { item } = defineProps<{
  item: StakingItemFragment
}>()
const { sharesStaked } = useStakingHelper(item)


const onClickUnstake = async () => {
  const stakingItem: UserStakingItem = {
    token: item.token,
    amount: unstakeAmount.value
  }
  const unstaked = await unstakeMetashare(stakingItem)
  if (unstaked)
    emit("close")
}


</script>