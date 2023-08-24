<template lang="pug">
HList(@focus="isFocused = true" @blur="isFocused = false" bg="gray-800 on-neutral:(gray-900 hover:gray-800) on-solid:(gray-600 hover:gray-400) on-focused:(!gray-800 on-solid:!gray-400)" w="full" h="full" py="2" :focused="isFocused" :solid="isSolid" :neutral="isNeutral" ref="inputElement")
  input(outline="none" appearance="none" v-model="data.value" w="full" color="white" placeholder="0" b="none" font="bold" bg="transparent" :neutral="isNeutral" text="center" @click="setInput" @keyup.enter="updateAmount" @focusout="updateAmount" :invalid="invalidNumber" :growing="!tight")
</template>

<!-- add on-solid:gray-something -->
<script lang="ts" setup>
import { setSeconds } from 'date-fns';
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  tight?: boolean
  isNeutral?: boolean
  isSolid?: boolean
}>()

const isFocused = ref(false)
const inputElement = ref()

const setInput = () => {
  isFocused.value = true
}

onClickOutside(inputElement, () => isFocused.value = false)

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const updateAmount = (e: any) => setValue(e.target.value)

const { invalidNumber, setValue } = useAdjustableNumber(data)
setSeconds

</script>
