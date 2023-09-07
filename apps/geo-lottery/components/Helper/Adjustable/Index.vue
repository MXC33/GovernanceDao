<template lang="pug">
HList(flex-grow="1" space-x="1" w="full" b="1 ix-white opacity-40" rounded="lg" bg="ix-white opacity-20")
  HelperAdjustableButton(type="minus" @click="decreaseAmount" :is-adjustable="isDecreasable" :inline="inline")

  HList(flex-grow="1" w="full" justify="center" items="center" pos="relative")
    HelperAdjustableNumber(v-model="data")

  HelperAdjustableButton(type="plus" @click="increaseAmount" :is-adjustable="isIncreasable" :inline="inline")

</template>

<script lang="ts" setup>
import type { AdjustableNumber } from "@ix/base/composables/Utils/useAdjustableNumber";

const props = defineProps<{
  modelValue: AdjustableNumber,
  inline?: boolean
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
