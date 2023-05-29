<template lang="pug">
div#popups(v-if="popup")

  CompleteListing(v-if="popup.type == 'bidding-successful'" :items="popup.items")

  CompletePlacedBids(v-else-if="popup.type == 'listing-successful'" :items="popup.items")

  Transfer(v-else-if="popup.type == 'transfer-item'" :token="popup.item")

  Listing(v-else-if="popup.type == 'list-item'" :items="[popup.item]")

</template>

<script setup lang="ts">

const { popup } = usePopups()

</script>