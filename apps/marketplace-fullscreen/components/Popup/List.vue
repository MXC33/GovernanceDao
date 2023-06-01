<template lang="pug">
div#popups()
  template(v-if="popup")
    CompleteListing(v-if="popup.type == 'listing-successful'" :items="popup.items")

    CompleteBidding(v-else-if="popup.type == 'bidding2-successful'" :items="popup.items")

    CompletePlacedBids(v-else-if="popup.type == 'bidding-successful'" :items="popup.items")

    CompleteTransfer(v-else-if="popup.type == 'transfer-item-successful'" :item="popup.item")

    Transfer(v-else-if="popup.type == 'transfer-item'" :token="popup.item")

    Listing(v-else-if="popup.type == 'list-item'" :items="popup.items")

    Bidding(v-else-if="popup.type == 'bid-item'" :items="popup.items")

  ErrorPopup(v-if="activeNotification" :notification="activeNotification")

</template>

<script setup lang="ts">

const { popup } = usePopups()
const { activeNotification } = useNotifications()
</script>
