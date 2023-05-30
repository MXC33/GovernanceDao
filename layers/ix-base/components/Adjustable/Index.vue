<template lang="pug">
HList(space-x="0.5" w="full" frame="~" items="center" justify="between")
  HList(items="center")
    AdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline")

  HList(justify="center" items="center" pos="relative")
    AdjustableNumber(v-model="data")

  HList(items="center")
    AdjustableButton(type="plus" @click="increaseAmount" :is-adjustable="isIncreasable" :inline="inline")

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
