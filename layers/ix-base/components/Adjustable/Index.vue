<template lang="pug">
HList(flex-grow="1" space-x="0.5" w="full")
  AdjustableButton(type="minus" @click="decreaseAmount"  :is-adjustable="isDecreasable" :inline="inline")

  HList(flex-grow="1" w="full" justify="center" bg="gray-600" items="center" pos="relative" :inline="inline")
    AdjustableNumber(v-model="data")

  AdjustableButton(type="plus" @click="increaseAmount"  :is-adjustable="isIncreasable" :inline="inline")

</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  inline?: boolean,
  hideMax?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const {
  isIncreasable,
  isDecreasable,
  increaseAmount,
  decreaseAmount,
} = useAdjustableNumber(data)

</script>
