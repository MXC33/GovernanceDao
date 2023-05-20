<template lang="pug">
input(outline="none" appearance="none" v-model="data.value" placeholder="0" b="none" font="bold" bg="transparent" w="on-growing:full" @keyup.enter="updateAmount" @focusout="updateAmount" text="center on-invalid:red-500" color="$corporation-text-color" :invalid="invalidNumber" :growing="!tight")
</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  tight?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const updateAmount = (e: any) => setValue(e.target.value)

const { invalidNumber, setValue } = useAdjustableNumber(data)

</script>
