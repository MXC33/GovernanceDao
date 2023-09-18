<template lang="pug">
input(outline="none" appearance="none" v-model="data.value" placeholder="0" b="none" bg="white opacity-0" w="4" min-w="full" @keyup.enter="updateAmount" @focusout="updateAmount" text="center on-invalid:red-500" color="$corporation-text-color" :invalid="invalidNumber" :growing="!tight")
</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~~/composables/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  tight?: boolean
}>()


const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const updateAmount = (e) => setValue(e.target.value)

const { invalidNumber, setValue } = useAdjustableNumber(data)

</script>
