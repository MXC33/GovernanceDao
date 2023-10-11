<template lang="pug">
div#popups()
  template(v-if="popup")

    //my Compontents
    PopupTypeInsufficientFunds(v-if="popup.type == 'insufficient-funds'")

    PopupTypeYouWin(v-else-if="popup.type == 'popup-type-you-win'")

    PopupTypeYouClaimed(v-else-if="popup.type == 'popup-type-you-claimed'" :lottery-id="popup.lottery_id", :token-id="popup.token_id")

    PopupTypeYouClaimedWithoutNFT(v-else-if="popup.type == 'popup-type-you-claimed-without-nft'")

    PopupTypePurchaseTickets(v-else-if="popup.type == 'popup-type-purchase-tickets'")

    PopupTypeOneTimeEntry(v-else-if="popup.type == 'popup-type-one-time-entry'")

    PopupTypeOneTimeEntrySuccess(v-else-if="popup.type == 'popup-type-one-time-entry-success'")

    PopupTypeSubscribe(v-else-if="popup.type == 'popup-type-subscribe'")

    PopupTypeSubscribeSuccess(v-else-if="popup.type == 'popup-type-subscribe-success'")

    PopupTypeSwap(v-else-if="popup.type == 'popup-type-swap'")

    PopupTypeSwapSuccess(v-else-if="popup.type == 'popup-type-swap-success'")

    PopupTypeManageTickets(v-else-if="popup.type == 'popup-type-manage-tickets'")

    PopupTypeUnsubscribeSuccess(v-else-if="popup.type == 'popup-type-unsubscribe-success'")


  PopupTypeTour(v-if="false")

  PopupTypeError(v-if="activeError" :error="activeError" )

</template>

<script setup lang="ts">

const { popup } = usePopups()
const { activeError } = useContractErrors()

const tour = ref(true)

</script>
