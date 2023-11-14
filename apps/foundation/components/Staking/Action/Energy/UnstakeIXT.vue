<template lang="pug">
PopupBase(@close="$emit('close')")
  template(#header) Withdraw IXT
  template(#default) 
    VList(space-y="default")
      InputGroup()
        template(#header) Withdraw amount
        template(#default)
          InputText(v-model.number="withdrawAmount" placeholder="Enter amount" type="number" :max-amount="totalUnlockedIXT")
            template(#suffix) IXT

        template(#detail) Withdrawable amount: {{ roundToDecimals(totalUnlockedIXT) }}

        template(#action)
          ButtonAnimated(btn="~ secondary-outline-cut sm" cut="s-sm" @click="withdrawAmount = userStake") Max

      InputGroup()
        template(#header) Unlocked IXT
        template(#default) 
          InputReadonly() {{ totalUnlockedIXT }}

  template(#footer)
    VList()
      InputSummaryRow(:primary="true")
        template(#name) Withdraw amount
        template(#value) 
          StakingActionTotalAmount(:amount="withdrawAmount" i18n="ixt")

  template(#buttons)
    Disabler(:disabled="withdrawAmount == 0")
      ButtonInteractive(@click="unstakeRequest" text="Unstake" :loading="isLoading" :loading-text="'Unstaking...'")

</template>

<script lang="ts" setup>
import type { StakingDataFragment, StakingItemFragment } from '#gql';
import type { UserStakingItem } from '@ix/base/composables/Contract/useStakingData';

const { unstakeIXT } = useEnergyStakingContract()
const { displaySnack } = useSnackNotifications()

const { item } = defineProps<{
  item: StakingItemFragment,
}>()
const { loading: isLoading, execute: unstakeRequest } = useContractRequestFnd(() => onClickUnstake(), 'unstake')

const withdrawAmount = ref(0)

const userStake = computed(() => item.userStakingData?.amountStaked ?? 0)

const emit = defineEmits(["close"])


const unlockedIXT = computed(() => item.userStakingData?.energyStakedAt?.filter(item => (((item?.timestamp ?? 1) + 2592000) * 1000) < Date.now()))

const totalUnlockedIXT = unlockedIXT.value?.reduce((a, b) => a + (b?.amount ?? 0), 0)

const onClickUnstake = async () => {
  const stakingItem: UserStakingItem = {
    token: item.token,
    amount: withdrawAmount.value
  }

  await unstakeIXT(stakingItem)

  emit("close")
  displaySnack("withdraw-success")
}


</script>