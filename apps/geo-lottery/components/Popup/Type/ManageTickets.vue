<template lang="pug">
Popup()
  template(#header) Manage Tickets

  template(#default)
    VList( pos="relative")
      HList( pos="relative" flex="~ col" mb-7)
        p( mb-1) Your one-time entries
        div(flex="~" ml="0")
          CirclePlusIcon(w="5" mr-3 cursor="pointer" @click="onOneTimeEntries()")
          p(font="bold" text="lg" v-if="enteredTickets") {{enteredTickets?.entered_tickets}} tickets
          p(v-else) Loading ...

      HList( pos="relative" flex="~ col" mb-7)
        p( mb-1) Your subscription entries
        div(flex="~" ml="0")
          CirclePlusIcon(w="5" mr-3 cursor="pointer" @click="onSubscribe()")
          p(font="bold" text="lg") {{enteredTickets?.entered_weekly_tickets || 0}} tickets
      HList( pos="relative" flex="~ col" mb-7)
        p( mb-1) Your one-time entries
        div(flex="~" ml="0" items-center)
          InputSwitch(v-model="switchModel")
          p(font="bold" text="lg" )
            template(v-if="switchModel") Active
              span(v-if="showContinueButton" ) &nbsp;- Press continue to comfirm
            template(v-else) Inactive
              span(v-if="showContinueButton") &nbsp;- Press continue to comfirm
  template(#footer)
    VList()
      ButtonItem(v-if="showContinueButton" :value="'pink'" :text="'CONTINUE'" @click="onContinue()" :loading="isLoading")

</template>
<script lang="ts" setup>
import CirclePlusIcon from '~/assets/icons/circle-plus.svg'
import { useLottery } from "~/composables/useLottery";
import { useManageTickets } from "~/composables/useManageTickets";
import { useContractRequest } from "~/composables/useContractRequest";
import { useSubscription } from "~/composables/useSubscription";
import { useLuckyCatGeoLotteryContract } from "~/composables/useLuckyCatGeoLotteryContract";

const { displayPopup } = usePopups()
const { walletState } = useWallet()
const { switchModel, setupSwitchModal, showContinueButton } = useManageTickets()
const { isLoggedInAndConnected } = useLogin()
const { enteredTickets } = useLottery()

watch(isLoggedInAndConnected, async (loggedIn) => {
  if (!loggedIn)
    return

  await setupSwitchModal()
}, { immediate: true })

const { removeLotteryFlow } = useSubscription()
const { loading: isLoading, execute: removeLotteryFlowRequest } = useContractRequest(() =>
  removeLotteryFlow()
)

const { userFlowActive: userFlowActiveContract } = useLuckyCatGeoLotteryContract()
const onContinue = async () => {
  if (await userFlowActiveContract()) {
    const removeLotteryFlow = await removeLotteryFlowRequest()
    if (removeLotteryFlow)
      displayPopup({
        type: 'popup-type-unsubscribe-success'
      })
  } else {
    displayPopup({
      type: 'popup-type-subscribe',
      backModal: 'popup-type-manage-tickets'
    })
  }
}

const onOneTimeEntries = () => {
  displayPopup({
    type: 'popup-type-one-time-entry',
    backModal: 'popup-type-manage-tickets'
  })
}

const onSubscribe = () => {
  displayPopup({
    type: 'popup-type-subscribe',
    backModal: 'popup-type-manage-tickets'
  })
}

</script>
