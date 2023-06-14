<template lang="pug">
div#popups()
  template(v-if="popup")
    CompleteListing(v-if="popup.type == 'listing-successful'" :items="popup.items")

    CompleteBidding(v-else-if="popup.type == 'bidding-successful'" :items="popup.items")

    CompleteTransfer(v-else-if="popup.type == 'transfer-item-successful'" :items="popup.items")

    CompleteBuy(v-else-if="popup.type == 'buy-items-success'" :items="popup.items")

    CompleteAccept(v-else-if="popup.type == 'accept-items-success'" :item="popup.item")

    CompleteUnlisting(v-else-if="popup.type == 'unlist-item-success'" :items="popup.items")

    CompleteUnbid(v-else-if="popup.type == 'unbid-success'" :items="popup.items")

    Transfer(v-else-if="popup.type == 'transfer-item'" :items="popup.items")

    Listing(v-else-if="popup.type == 'list-item'" :items="popup.items")

    Unlisting(v-else-if="popup.type == 'unlist-item'" :items="popup.items")

    Bidding(v-else-if="popup.type == 'bid-item'" :items="popup.items")

    Unbid(v-else-if="popup.type == 'unbid-item'" :items="popup.items")

    Accepting(v-else-if="popup.type == 'accept-item'" :item="popup.item")

    IXTInsufficient(v-else-if="popup.type == 'insufficient-funds'")


  ErrorPopup(v-if="activeError" :error="activeError")

</template>

<script setup lang="ts">

const { popup } = usePopups()
const { activeError } = useContractErrors()

</script>
