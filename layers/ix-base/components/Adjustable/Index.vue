<template lang="pug">
HList(w="full" frame="~ gray-400 hover:gray-300 on-frameless:none" :frameless="!hasFrame" items="center" justify="between on-frameless:none" bg="hover:gray-800 on-frameless:gray-600" group)
  HList(items="center" justify="on-frameless:center" flex-grow="on-frameless:1" bg="on-frameless:hover:gray-400" h="on-frameless:full" :frameless="!hasFrame")
    AdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline")

  HList(justify="center" items="center" pos="relative" b="on-frameless:(l-1 r-1 gray-900)" :frameless="!hasFrame")
    AdjustableNumber(v-model="data" :neutral="isNeutral" :cart="isCart" :is-cart="isCart" bg="gray-800 on-cart:(gray-600 hover:gray-400) on-neutral:(gray-900 group-hover:gray-800)" :frameless="!hasFrame" :is-popup="isPopup")

  HList(items="center" justify="on-frameless:center" flex-grow="on-frameless:1" bg="on-frameless:hover:gray-400" h="on-frameless:full" :frameless="!hasFrame")
    AdjustableButton(type="plus" @click="increaseAmount" :is-adjustable="isIncreasable" :inline="inline")

</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  inline?: boolean
  hideMax?: boolean
  isNeutral?: boolean
  isCart?: boolean
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
