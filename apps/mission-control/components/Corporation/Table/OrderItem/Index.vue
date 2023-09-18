<template lang="pug">
div(flex="~ col grow" justify="center" color="opacity-80 on-not-enough:red-500" :not-enough="isNotEnough")

  CorporationTableRowColumn(v-if="!modelValue.adjustable" justify="center")
    CorporationTableOrderItemStatic(:order-item="modelValue")

  CorporationTableOrderItemAdjustable(v-model="data" v-else)

</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';
const { balanceOfToken } = useUserData()

const props = defineProps<{
  modelValue: CorporationPaymentToken,
}>()
const emit = defineEmits<{ (e: 'update:modelValue', value: CorporationPaymentToken): void }>()
const data = useVModel(props, 'modelValue', emit)

const isNotEnough = computed(() => balanceOfToken(props.modelValue) < props.modelValue.value)

console.log("Balance?", balanceOfToken(props.modelValue), props.modelValue.value, isNotEnough.value)

</script>
