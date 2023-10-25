<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Withdraw IXT
  template(#default) 
    VList(space-y="6")
      InputGroup()
        template(#header) Withdraw amount
        template(#default)
          InputText(v-model.number="withdrawAmount" placeholder="Enter amount" type="number")
            template(#suffix) IXT

        template(#detail) Staked Amount: {{ roundToDecimals(userStake) }}

        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="withdrawAmount = userStake") Max

  template(#footer)
    VList()
      InputSummaryRow(:primary="true")
        template(#name) Withdraw amount
        template(#value) 
          GlitchText(:text="String(String(withdrawAmount) == '' ? 0 : withdrawAmount)" suffix=" IXT")

  template(#buttons)
    Disabler(:disabled="withdrawAmount == 0")
      ButtonInteractive(@click="onClickStake" text="Stake")

</template>

<script lang="ts" setup>
import type { StakingDataFragment } from '#gql';

const withdrawAmount = ref(0)
const { getUserStakeInPool } = useStakingPools()

const userStake = computed(() => getUserStakeInPool('ixt', pool))

const emit = defineEmits(["close"])

const { pool } = defineProps<{
  pool: StakingDataFragment,
  month: number
}>()

const onClickStake = () => {
  emit("close")
}


</script>