<template lang="pug">
input(outline="none" appearance="none" v-model="data.value" placeholder="0" b="none" bg="white opacity-0" w="4" min-w="full" @keyup.enter="updateAmount" @focusout="updateAmount" text="center on-invalid:red-500"  v-if="data" color="inherit" :invalid="invalidNumber" :growing="!tight")
</template>

<script lang="ts" setup>
import { setSeconds } from 'date-fns';
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

defineProps<{
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

const data = defineModel<AdjustableNumber | AdjustableToken>()

const updateAmount = (e: any) => setValue(e.target.value)

const { invalidNumber, setValue } = useAdjustableNumber(data)
setSeconds

</script>
