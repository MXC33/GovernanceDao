<template lang="pug">
Popup()
  template(#header) Purchase Tickets

  template(#default)
    VList(space-Y="4" pos="relative")
      HList(space-x="3" pos="relative")
        p() Choose method
        HelperHover(tooltip-id="Choose method Info tooltip")
          InfoIcon(w="5")

      InputRadio(v-model="purchaseTypeModel" :value="'popup-type-one-time-entry'")
        template(#default) One-time entry
        //template(#info) {{enteredTickets?.entered_tickets || 0}} entries out of {{maxOneTimeEntries}}
      InputRadio(v-model="purchaseTypeModel" :value="'popup-type-subscribe'")
        template(#default) Subscription stream
        //template(#info) {{enteredTickets?.entered_weekly_tickets || 0}} entries out of {{maxSubscriptionEntries}}

      p(text="xs" p="x-4" m="-b-2" v-if="purchaseTypeModel === 'popup-type-subscribe'" ) <strong>Disclaimer:</strong> to get one ticket at the end of the streaming period you need to have streamed 10 AGOLD. For each 10 AGOLD you have steamed you will get one ticket and each ticket takes one week to stream in full. The next streaming period starts after each draw. If you enter later than at the start of the stream period your requested ticket amount will not be fully completed and the remainder of AGOLD will be lost.

  template(#footer)
    VList()
      ButtonItem(:value="'pink'" :text="'CONTINUE'" @click="onContinue()")

</template>
<script lang="ts" setup>
import InfoIcon from '~/assets/icons/info.svg'
const { displayPopup } = usePopups()
const { maxOneTimeEntries } = useEnterLottery()
const { maxSubscriptionEntries } = useSubscription()
const { enteredTickets, getEnteredTickets } = useLottery()
const { useEnteredTicketData } = usePlayerAPI()
const { refresh: refreshTicketData } = useEnteredTicketData()

const purchaseTypeModel = ref<'popup-type-one-time-entry' | 'popup-type-subscribe'>('popup-type-one-time-entry')

refreshTicketData().then(() => {
  getEnteredTickets()
})

const onContinue = () => {
  displayPopup({
    type: purchaseTypeModel.value,
    backModal: 'popup-type-purchase-tickets'
  })
}


</script>
