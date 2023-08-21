<template lang="pug">
input(@focus="isFocused = true" @blur="isFocused = false" outline="none" appearance="none" v-model="data.value" placeholder="0" b="none" font="bold" w="full" bg="gray-800 on-neutral:gray-900 on-popup:gray-600 on-focused:!(gray-400 hover:gray-400)" ref="inputElement" :focused="isFocused" :popup="isPopup" :neutral="isNeutral" text="center" py="2" @keyup.enter="updateAmount" @focusout="updateAmount" :invalid="invalidNumber" :growing="!tight")
</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  tight?: boolean
  isNeutral?: boolean
  isPopup?: boolean
}>()

const isFocused = ref(false)
const inputElement = ref()

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const updateAmount = (e: any) => setValue(e.target.value)

const { invalidNumber, setValue } = useAdjustableNumber(data)

</script>
