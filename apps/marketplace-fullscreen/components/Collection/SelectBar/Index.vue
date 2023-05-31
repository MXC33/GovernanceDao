<template lang="pug">
div(v-if="amountSelected != 0" w="full" p="3" pos="sticky bottom-0" z="2" bg="ix-black")
  HList(space-x="3" items="center")
    HList(font="bold" text="md" space-x="3")
      div(text="white" capitalize="~" ) {{amountSelected}} Items selected 
      button(text="red" capitalize="~" @click="clearSelectedItems") clear all

    //- To Create space between the text on the left side an the buttons on the right 
    div(flex="grow")

    CollectionSelectBarButton(v-if="context=='my-assets'") Transfer {{amountSelected}} 
    CollectionSelectBarButton(v-else-if="context=='collection'" @click="onAddToCart") Add {{amountSelected}} To Cart 
    tempate(v-else-if="context=='incoming-bids'")
      CollectionSelectBarButton() Reject {{amountSelected}} Bids
      CollectionSelectBarButton() Accept {{amountSelected}} Bids 

</template>

<script lang="ts" setup>
import type { IXToken } from '~/../../layers/ix-base/composables/Token/useIXToken';
import type { CollectionContext } from '~/composables/useCollection';
const { addToCart } = useCart()

const props = defineProps<{
  context: CollectionContext
}>()

onUnmounted(() => {
  clearSelectedItems()
})

const onAddToCart = () => {
  selectedItems.value.map(item => addToCart(item.token))
}


const { selectedItems, clearSelectedItems } = useSelection()
const amountSelected = computed(() => selectedItems.value.length)
</script>