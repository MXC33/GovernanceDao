<template lang="pug">
HList(w="full" justify="between" color="#000" gap="4")
  button.btn(@click="decrease" :disabled="min === quantity")  -
  input(type="number" :min="min" :max="max" v-model="quantity" @input="onInput" @keypress="useIsKeyNumber($event)" w="full")
  button.btn(@click="increase" :disabled="max === quantity")  +
</template>

<script lang="ts" setup>
import {useIsKeyNumber} from "@ix/base/composables/Utils/useHelpers"
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  min: number
  max: number
  modelValue: number
}>()

const emit = defineEmits(["update:modelValue"])

const quantity = useVModel(props, 'modelValue', emit)

const decrease = () => quantity.value <= props.min ? props.min : quantity.value --
const increase = () => quantity.value >= props.max ? props.max : quantity.value ++

const onInput = (event: InputEvent) => {
  console.log('fisky', event)
  if (quantity.value <= props.min)
    quantity.value = props.min
  else if (quantity.value >= props.max)
    quantity.value = props.max
}

</script>

<style scoped>
.btn {
  background: #fff;
  color: #000;
  padding: 5px 10px;
}
</style>