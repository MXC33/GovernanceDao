<template lang="pug">
CorporationTableRowContainer
  template(v-slot:icon)
    TokenImage(:token="modelValue"  b="1 r-none $mc-accent-40" p="1" h="full")

  template(v-slot:left) 
    CorporationTableRowColumn {{ name }}

  template(v-slot:right)
    CorporationTableOrderItem(v-model="data" grid="col-span-2")
</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';
const { balanceOfToken } = useUserData()

const props = defineProps<{
  modelValue: CorporationPaymentToken
}>()


const name = computed(() => {
  const { tier, type } = props.modelValue
  const balance = balanceOfToken(props.modelValue)

  return `${tier ?? ''} ${type} [${balance}]`
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: CorporationPaymentToken): void
}>()

const data = useVModel(props, 'modelValue', emit)

</script>