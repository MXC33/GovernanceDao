<template lang="pug">
VList(bg="gray-800" v-for="item in cartItems")
  header(p="x-6 y-3" font="bold")
    TokenName(:token="item.token")

  HList()
    TokenImage(:token="item.token" w="30" h="30")

    Adjustable(v-model="number")
    
  </template>
  
  
<script lang="ts" setup>
import type { AdjustableNumber } from '~/../../layers/ix-base/composables/Utils/useAdjustableNumber';
import type { CartItem } from '~/composables/useCart';

const cartElement = ref()

onClickOutside(cartElement, () => viewingCart.value = false)

const { viewingCart, cartItems } = useCart()

const props = defineProps<{
  modelValue: CartItem
}>()
const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

const number = ref<AdjustableNumber>({
  min: 1,
  value: props.modelValue.amount,
  max: 100
})

watch(number, (newVal) => {
  data.value.amount = newVal.value
})

</script>
  