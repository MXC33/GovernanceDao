<template lang="pug">
input(outline="none" appearance="none" v-model="data.value" placeholder="0" b="none" font="bold" w="full" bg="gray-800 on-neutral:gray-900 on-popup:gray-600" :popup="isPopup" :neutral="isNeutral" text="center" py="2" @keyup.enter="updateAmount" @focusout="updateAmount" :invalid="invalidNumber" :growing="!tight")
</template>

<script lang="ts" setup>
import type { AdjustableNumber, AdjustableToken } from '~/composables/Utils/useAdjustableNumber';

const props = defineProps<{
  modelValue: AdjustableNumber | AdjustableToken,
  tight?: boolean
  isNeutral?: boolean
  isPopup?: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const data = useVModel(props, 'modelValue', emit)

const updateAmount = (e: any) => setValue(e.target.value)

const { invalidNumber, setValue } = useAdjustableNumber(data)

</script>
