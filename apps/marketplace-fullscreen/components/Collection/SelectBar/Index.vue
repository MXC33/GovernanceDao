<template lang="pug">
div(v-if="amountSelected != 0" w="full" p="3" pos="sticky bottom-0" z="2" bg="ix-black")
  HList(space-x="3" items="center")
    HList(font="bold" text="md" space-x="3")
      div(text="white" capitalize="~") {{amountSelected}} Items selected 
      button(text="red" capitalize="~" @click="clearSelectedItems") {{ $t(`marketplace.cart.clearAll`) }}

    //- To Create space between the text on the left side an the buttons on the right 
    div(flex="grow")

    template(v-if="context=='my-assets'")
      CollectionSelectBarButton(:secondary="true" @click="onTransferMultiple" disable="on-differentCollection:active" :differentCollection="!selectedItemsIsSameCollection") Transfer {{amountSelected}} 
      CollectionSelectBarButton(@click="onClickList") List {{amountSelected}} 

    template(v-else-if="context=='collection'")
      CollectionSelectBarButton(@click="onClickOffer" :secondary="true" v-if="amountSelected == 1") Place {{amountSelected}} offer
      CollectionSelectBarButton(@click="onClickOffer" :secondary="true" v-else-if="amountSelected >= 1") Place {{amountSelected}} offers


      CollectionSelectBarButton(@click="onAddToCart") Add {{amountSelected}} To Cart 


    template(v-else-if="context=='incoming-bids'")
      //- CollectionSelectBarButton(@click="onClickRejectBids") Reject {{amountSelected}} Bids
      CollectionSelectBarButton(@click="onClickAcceptBids") Accept {{amountSelected}} Bids 

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