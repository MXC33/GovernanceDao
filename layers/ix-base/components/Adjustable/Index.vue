<template lang="pug">
HList(space-x="0.5" w="full" frame="~ gray-400 on-frameless:none" :frameless="!hasFrame" items="center" justify="between on-frameless:none" bg="on-frameless:gray-600")
  HList(items="center" justify="on-frameless:center" flex-grow="on-frameless:1" :frameless="!hasFrame")
    AdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline")

  HList(justify="center" items="center" pos="relative")
    AdjustableNumber(v-model="data" :is-neutral="isNeutral" b="on-frameless:l-1 r-1 gray-900" :frameless="!hasFrame" :is-popup="isPopup")

  HList(items="center" justify="on-frameless:center"  flex-grow="on-frameless:1" :frameless="!hasFrame")
    AdjustableButton(type="plus" @click="increaseAmount" :is-adjustable="isIncreasable" :inline="inline")

</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  inline?: boolean
  hideMax?: boolean
  isNeutral?: boolean
  hasFrame?: boolean
  isPopup?: boolean
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
