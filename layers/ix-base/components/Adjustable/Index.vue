<template lang="pug">
HList(w="full" frame="~ gray-400 hover:gray-300 on-frameless:none" :frameless="!hasFrame" group)
  HList(bg="hover:gray-800 on-frameless:hover:gray-400 on-solid:gray-600" :frameless="!hasFrame" :solid="isSolid" w="on-solid:45%" justify="on-solid:center")
    AdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline")

  HList(items="center" justify="center" b="on-frameless:(l-1 r-1 gray-900)" :frameless="!hasFrame" w="full")
    AdjustableNumber(v-model="data" :is-neutral="isNeutral" :is-solid="isSolid")

  HList(bg="hover:gray-800 on-frameless:hover:gray-400 on-solid:gray-600" :frameless="!hasFrame" :solid="isSolid" w="on-solid:45%" justify="on-solid:center")
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
