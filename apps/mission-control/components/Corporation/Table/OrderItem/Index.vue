<template lang="pug">
div(flex="~ col grow" justify="center" color="opacity-80 on-not-enough:red-500" :not-enough="isNotEnough")

  CorporationTableRowColumn(v-if="!modelValue.adjustable" justify="center")
    CorporationTableOrderItemStatic(:order-item="modelValue")

  CorporationTableOrderItemAdjustable(v-model="data" v-else)

</template>

<script lang="ts" setup>
import type { CorporationPaymentToken } from '~~/composables/corporations/useCorporations';
const { balanceOfToken } = useUserData()

const data = defineModel<CorporationPaymentToken>()

const isNotEnough = computed(() => balanceOfToken(data.value.token) < data.value.value)

</script>
