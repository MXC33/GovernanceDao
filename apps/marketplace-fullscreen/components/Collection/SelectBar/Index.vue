<template lang="pug">
div(v-if="amountSelected != 0" w="full" p="3" pos="sticky bottom-0" z="2" bg="ix-black")
  HList(space-x="3" items="center")
    HList(font="bold" text="md" space-x="3")
      div(text="white" capitalize="~") {{amountSelected}} Items selected 
      button(text="red" capitalize="~" @click="clearSelectedItems") {{ $t(`marketplace.cart.clearAll`) }}

    //- To Create space between the text on the left side an the buttons on the right 
    div(flex="grow")

    template(v-if="context=='my-assets'")
      CollectionSelectBarButton(:secondary="true" @click="onTransferMultiple") Transfer {{amountSelected}} 
      CollectionSelectBarButton(@click="onClickList") List {{amountSelected}} 

    CollectionSelectBarButton(v-else-if="context=='collection'" @click="onAddToCart") Add {{amountSelected}} To Cart 

    template(v-else-if="context=='incoming-bids'")
      CollectionSelectBarButton() Reject {{amountSelected}} Bids
      CollectionSelectBarButton() Accept {{amountSelected}} Bids 

</template>

<script lang="ts" setup>
import type { CollectionContext } from '~/composables/useCollection';
const { addToCart } = useCart()
const { displayPopup } = usePopups()

const onClickList = () => {
  displayPopup({
    type: 'list-item',
    items: selectedItems.value.map(({ token }) => token)
  })
}

const onTransferMultiple = () => {
  displayPopup({
    type: 'transfer-item',
    items: selectedItems.value.map(({ token }) => token)
  })
}

defineProps<{
  context: CollectionContext
}>()

onUnmounted(() => {
  clearSelectedItems()
})

const onAddToCart = () => {
  selectedItems.value.map(item => addToCart(item.token, item.token.lowest_sale))
}




const { selectedItems, clearSelectedItems } = useSelection()
const amountSelected = computed(() => selectedItems.value.length)
</script>