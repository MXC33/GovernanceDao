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

const data = defineModel<CorporationPaymentToken>()
const name = computed(() => {
  const token = data.value?.token
  if (!token)
    return ""
  const { tier, type } = token?.tokenInfo
  const balance = balanceOfToken(token)

  return `${tier ?? ''} ${type} [${balance}]`
})


</script>