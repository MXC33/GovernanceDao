<template lang="pug">
HList(min-w="0" frame="none on-has-frame:(~ gray-400 hover:gray-300)" :has-frame="look == 'frame'" group fill="white" color="white" min-h="10")
  AdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :look="look")

  HList(flex-grow="1" w="full" justify="center" b="0 inherit" items="center" pos="relative" :look="look")
    AdjustableNumber(v-model="data" :look="look")

  AdjustableButton(type="plus" @click="increaseAmount" :is-adjustable="isIncreasable" :look="look")

</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableNumberStyle, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';



const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  inline?: boolean
  hideMax?: boolean
  look?: AdjustableNumberStyle,
  isNeutral?: boolean
  hasFrame?: boolean
  isSolid?: boolean
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
