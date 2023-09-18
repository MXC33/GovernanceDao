<template lang="pug">
HList(space-x="1" min-w="0")
  HelperAdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline" :is-locked="isLocked")

  HList(flex-grow="1" w="full" justify="center" b="1 $mc-secondary_40 on-inline:0" items="center" pos="relative" :inline="inline")
    HelperAdjustableNumber(v-model="data")

  HelperAdjustableButton(type="plus" @click="increaseAmount" :is-adjustable="isIncreasable" :inline="inline" :is-locked="isLocked")

</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~~/composables/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  inline?: boolean,
  hideMax?: boolean
  isLocked?: boolean
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
