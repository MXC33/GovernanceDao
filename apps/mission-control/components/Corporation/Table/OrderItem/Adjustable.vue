<template lang="pug">
HList(flex-grow="1" space-x="1" w="full" min-h="8")
  Adjustable(v-model="data")

</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';

const props = defineProps<{
  modelValue: CorporationPaymentToken,
}>()

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

console.log("Adjustable", data.value)

</script>
