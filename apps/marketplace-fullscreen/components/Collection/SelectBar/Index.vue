<template lang="pug">
div(v-if="amountSelected != 0" w="full" p="4 md:3" pos="sticky bottom-0" z="2" bg="ix-black" b="lt-md:t-1 gray-600")
  div(flex="~ col md:row" space-x="md:3" space-y="lt-md:4" items="md:center" justify="between" px="0 md:5" w="full")

    HList(font="bold" text="md" space-x="md:8" flex-grow="1" items="center" w="full" justify="lt-md:between")
      div(v-if="amountSelected == 1" white="white" whitespace="nowrap") {{amountSelected}} {{ $t('collection.selectBar.itemSelected') }}
      div(v-else-if="amountSelected >= 1" color="white" whitespace="nowrap") {{amountSelected}} {{ $t('collection.selectBar.itemsSelected') }}
      button(color="ix-ne" capitalize="~" @click="clearSelectedItems" whitespace="nowrap") {{ $t('marketplace.cart.clearAll') }}

    HList(w="full" flex-grow="md:1" justify="between md:end" gap="4")
      template(v-if="context=='my-assets'")
        CollectionSelectBarButton(:secondary="true" @click="onTransferMultiple" disable="on-differentCollection:active" :differentCollection="!selectedItemsIsSameCollection") {{ $t('collection.selectBar.transfer') }} {{amountSelected}}
        CollectionSelectBarButton(@click="onClickList") {{ $t('collection.selectBar.list') }} {{amountSelected}}

      template(v-else-if="context=='collection'")
        CollectionSelectBarButton(@click="onClickOffer" :secondary="true" v-if="amountSelected == 1") {{ $t('collection.selectBar.placeBid', {amountSelected: amountSelected}) }}
        CollectionSelectBarButton(@click="onClickOffer" :secondary="true" v-else-if="amountSelected >= 1") {{ $t('collection.selectBar.placeBids', {amountSelected: amountSelected}) }}


        CollectionSelectBarButton(@click="onAddToCart") {{ $t('collection.selectBar.addToCart', {amountSelected: amountSelected}) }}


      template(v-else-if="context=='incoming-bids'")
        //- Reject Bids button when ready
        CollectionSelectBarButton(@click="onClickRejectBids") {{ $t('collection.selectBar.rejectOffers', {amountSelected: amountSelected}) }}
        CollectionSelectBarButton(@click="onClickAcceptBids" v-if="amountSelected == 1") {{ $t('collection.selectBar.acceptOffer', {amountSelected: amountSelected}) }}
        CollectionSelectBarButton(@click="onClickAcceptBids" v-else-if="amountSelected >= 1") {{ $t('collection.selectBar.acceptOffers', {amountSelected: amountSelected}) }}

      template(v-else-if="context == 'outgoing-bids'")
        CollectionSelectBarButton(@click="onClickRemoveBids" v-if="amountSelected == 1") {{ $t('collection.selectBar.removeBid', {amountSelected: amountSelected}) }}
        CollectionSelectBarButton(@click="onClickRemoveBids" v-else="amountSelected >= 1") {{ $t('collection.selectBar.removeBids', {amountSelected: amountSelected}) }}



</template>

<script lang="ts" setup>
import type { CollectionContext } from '~/composables/useCollection';
const { addToCart } = useCart()
const { displayPopup } = usePopups()
const { selectedItemsIsSameCollection } = useSelection()

const onClickRejectBids = () => {
  displayPopup({
    type: 'reject-items',
    items: selectedItems.value
  })
}

const onClickRemoveBids = () => {
  displayPopup({
    type: 'unbid-item',
    items: selectedItems.value
  })
}

const onClickAcceptBids = () => {
  displayPopup({
    type: 'accept-items',
    items: selectedItems.value
  })
}

const onClickList = () => {
  displayPopup({
    type: 'list-item',
    items: selectedItems.value
  })
}

const onClickOffer = () => {
  displayPopup({
    type: 'bid-item',
    items: selectedItems.value
  })
}

const onTransferMultiple = () => {
  displayPopup({
    type: 'transfer-item',
    items: selectedItems.value
  })
}

defineProps<{
  context: CollectionContext
}>()

onUnmounted(() => {
  clearSelectedItems()
})

const onAddToCart = () => {
  selectedItems.value.map(item => addToCart(item, item.lowest_sale))
}

const { selectedItems, clearSelectedItems } = useSelection()
const amountSelected = computed(() => selectedItems.value.length)

</script>
