<template lang="pug">
GameMenuBuild()
GameMenuOverview()
GameMenuTaskManager()

GameActionPopupWasteCollection(v-if="gameMenu == 'waste-collect'")
GameActionPopupCorporation(v-if="gameMenu == 'corporation-splash'")
GameActionPopupSpeedup(v-if="activeSpeedupOrder != null" :order="activeSpeedupOrder.order", :corporation="activeSpeedupOrder.corporation")

PopupWrapper(v-if="isPendingAccept && proposedNFT")
  BuildConfirm()

PopupWrapper(v-if="displayRent")
  BuildConfirmRent()
</template>

<script setup lang="ts">
const gameMenu = useGameMenu()
const { isPendingAccept } = useTransactions()
const { proposedNFT } = useStakeNFTFlow()
const { proposedTileRental } = useTileRentProposal()
const displayRent = computed(() => isPendingAccept.value && proposedTileRental.value && proposedTileRental.value.length > 0)
const { activeSpeedupOrder } = useCorporationOrders()
</script>