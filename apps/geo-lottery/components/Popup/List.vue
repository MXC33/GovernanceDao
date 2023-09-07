<template lang="pug">
div#popups()
  template(v-if="popup")
    //CompleteListing(v-if="popup.type == 'listing-successful'" :items="popup.items")
    //
    //CompleteBidding(v-else-if="popup.type == 'bidding-successful'" :items="popup.items")
    //
    //CompleteTransfer(v-else-if="popup.type == 'transfer-item-successful'" :items="popup.items")
    //
    //CompleteBuy(v-else-if="popup.type == 'buy-items-success'" :items="popup.items")
    //
    //CompleteAccept(v-else-if="popup.type == 'accept-items-success'" :items="popup.items")
    //
    //CompleteUnlisting(v-else-if="popup.type == 'unlist-item-success'" :items="popup.items")
    //
    //CompleteUnbid(v-else-if="popup.type == 'unbid-success'" :items="popup.items")
    //
    //Transfer(v-else-if="popup.type == 'transfer-item'" :items="popup.items")
    //
    //Listing(v-else-if="popup.type == 'list-item'" :items="popup.items")
    //
    //Unlisting(v-else-if="popup.type == 'unlist-item'" :items="popup.items")
    //
    //Bidding(v-else-if="popup.type == 'bid-item'" :items="popup.items")
    //
    //Unbid(v-else-if="popup.type == 'unbid-item'" :items="popup.items")
    //
    //Accepting(v-else-if="popup.type == 'accept-items'" :items="popup.items")
    //
    //Rejecting(v-else-if="popup.type == 'reject-items'" :items="popup.items")
    //
    //IXTInsufficient(v-else-if="popup.type == 'insufficient-funds'")

    //my Compontents
    PopupTypeYouWin(v-if="popup.type == 'popup-type-you-win'")

    PopupTypePurchaseTickets(v-else-if="popup.type == 'popup-type-purchase-tickets'")

    PopupTypeOneTimeEntry(v-else-if="popup.type == 'popup-type-one-time-entry'")

    PopupTypeOneTimeEntrySuccess(v-else-if="popup.type == 'popup-type-one-time-entry-success'")

    PopupTypeSubscribe(v-else-if="popup.type == 'popup-type-subscribe'")

    PopupTypeSubscribeSuccess(v-else-if="popup.type == 'popup-type-subscribe-success'")

    PopupTypeSwap(v-else-if="popup.type == 'popup-type-swap'")

    PopupTypeSwapSuccess(v-else-if="popup.type == 'popup-type-swap-success'")

    PopupTypeManageTickets(v-else-if="popup.type == 'popup-type-manage-tickets'")


  ErrorPopup(v-if="activeError" :error="activeError")

</template>

<script setup lang="ts">

const { popup } = usePopups()
const { activeError } = useContractErrors()

</script>
