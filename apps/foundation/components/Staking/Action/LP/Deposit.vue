<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Stake {{$t(`general.${suffix}`)}}
  template(#default) 
    VList(space-y="default")
      InputGroup()
        template(#header) Stake amount
        template(#default)
          InputText(v-model.number="stakeAmount" placeholder="Enter amount" type="number" :max-amount="tokenBalance")
            template(#suffix) {{$t(`general.${suffix}`)}}

        template(#detail) Total Balance: {{ roundToDecimals(tokenBalance) }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="stakeAmount = tokenBalance") Max

      InputGroup()
        template(#header) Locking Period
        template(#default) 
          InputReadonly() {{formattedMonths(month)}}

      InputGroup()
        template(#header) APY 
        template(#default) 
          VList(space-y="2")
            div(text="semantic-warning") The APY for {{formattedMonths(month)}} could temporarily go lower than the APY for shorter locking periods since it is dynamic based on TVL.

            StakingActionAgreement(v-model="isAgreed")

  template(#footer)
    VList()
      InputSummaryRow()
        template(#name) Locking Period
        template(#value) {{formattedMonths(month)}} 

      InputSummaryRow(:primary="true")
        template(#name) Wallet balance
        template(#value) 
          GlitchText(:text="String(roundToDecimals(tokenBalance - stakeAmount,4))")

      InputSummaryRow(:primary="true")
        template(#name) Stake amount
        template(#value) 
          StakingActionTotalAmount(:amount="stakeAmount" :i18n="suffix")

  template(#buttons)
    Disabler(:disabled="!isAgreed || stakeAmount == 0")
      ButtonInteractive(@click="onClickStake" text="Stake")

</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import { formattedMonths } from '@ix/base/composables/Utils/useHelpers';

const { pool } = defineProps<{
  pool?: StakingDataFragment,
  month: number
}>()

const stakeAmount = ref(0)
const isAgreed = ref(false)

const emit = defineEmits(["close", "stake"])

const suffix = computed(() => pool?.stakingItems[0]?.token.tokenInfo?.type ?? "")

const tokenBalance = computed(() => pool?.stakingItems[0]?.userStakingData?.balanceOfToken ?? 0)



const onClickStake = () => {
  emit("stake", stakeAmount.value)
}


</script>