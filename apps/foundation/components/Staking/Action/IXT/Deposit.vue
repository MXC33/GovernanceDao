<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Stake IXT
  template(#default) 
    VList(space-y="6")
      InputGroup()
        template(#header) Stake amount
        template(#default)
          InputText(v-model.number="stakeAmount" placeholder="Enter amount" type="number" :max-amount="ixtBalance")
            template(#suffix) IXT

        template(#detail) Total Balance: {{ roundToDecimals(ixtBalance) }}
        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="stakeAmount = ixtBalance") Max

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
          GlitchText(:text="String(roundToDecimals(ixtBalance - stakeAmount,4))" suffix=" IXT")

      InputSummaryRow(:primary="true")
        template(#name) Stake amount
        template(#value) 
          StakingActionTotalAmount(:amount="stakeAmount" i18n="stake")

  template(#buttons)
    Disabler(:disabled="!isAgreed || stakeAmount == 0")
      ButtonInteractive(@click="onClickStake" text="Stake")

</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';
import { formattedMonths } from '@ix/base/composables/Utils/useHelpers';

const { ixtBalance } = useCurrencyData()
const stakeAmount = ref(0)
const isAgreed = ref(false)

const emit = defineEmits(["close", "stake"])

defineProps<{
  pool?: StakingDataFragment,
  month: number
}>()

const onClickStake = () => {
  emit("stake", stakeAmount.value)
}


</script>