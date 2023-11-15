<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Withdraw {{$t(`general.${suffix}`)}}
  template(#default) 
    VList(space-y="default")
      InputGroup()
        template(#header) Withdraw amount
        template(#default)
          InputText(v-model.number="withdrawAmount" placeholder="Enter amount" type="number" :max-amount="userStake")
            template(#suffix) {{$t(`general.${suffix}`)}}

        template(#detail) Staked Amount: {{ roundToDecimals(userStake) }}

        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="withdrawAmount = userStake") Max


  template(#footer)
    VList()
      InputSummaryRow(:primary="true")
        template(#name) Withdraw amount
        template(#value) 
          StakingActionTotalAmount(:amount="withdrawAmount" :i18n="suffix")

  template(#buttons)
    Disabler(:disabled="withdrawAmount == 0")
      ButtonInteractive(@click="onClickStake" text="Withdraw")

</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';


const withdrawAmount = ref(0)

const userStake = computed(() => pool?.stakingItems[0]?.userStakingData?.amountStaked ?? 0)

const emit = defineEmits(["close", "withdraw"])

const { pool } = defineProps<{
  pool: StakingDataFragment,
}>()

const suffix = computed(() => pool?.stakingItems[0]?.token.tokenInfo?.type ?? "")

const tokenBalance = computed(() => pool?.stakingItems[0]?.userStakingData?.balanceOfToken ?? 0)



const onClickStake = () => {
  emit("withdraw", withdrawAmount.value)
}


</script>