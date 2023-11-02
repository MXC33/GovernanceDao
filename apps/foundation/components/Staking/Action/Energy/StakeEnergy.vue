<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Stake Energy
  template(#default) 
    VList(space-y="6")
      InputGroup()
        template(#header) Amount
        template(#default)
          InputText(v-model.number="stakeAmount" placeholder="Enter amount" type="number" :maxAmount="sharesStakable")
            template(#suffix) {{ $t('general.amount', stakeAmount)  }} 

        template(#detail) Total Balance: {{ sharesStakable }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="stakeAmount = sharesStakable") Max

      InputGroup()
        template(#header) Energy
        template(#default) 
          InputReadonly() {{item.token.tokenInfo?.title}}

      InputGroup()
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
      ButtonInteractive(@click="onClickStake" text="Stake")

</template>

<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';
import type { UserStakingItem } from 'composables/useStakingPools';

const stakeAmount = ref(0)
const isAgreed = ref(false)

const emit = defineEmits(["close"])
const { stakeEnergy, stakeAmeliaEnergy } = useEnergyStakingContract()

const { item, id } = defineProps<{
  item: StakingItemFragment
  id: string
}>()

const { sharesStakable } = useStakingHelper(item)

const onClickStake = () => {
  const stakingItem: UserStakingItem = {
    token: item.token,
    amount: stakeAmount.value
  }

  console.log("energy id", id)
  if (id == 'amelia')
    stakeAmeliaEnergy(stakingItem)
  if (id == 'energy')
    stakeEnergy(stakingItem)
}


</script>