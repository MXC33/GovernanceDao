<template lang="pug">
component(:is="iconPath" fill="white")
</template>

<script lang="ts" setup>
import IXTIcon from '~/assets/images/ui/resources/ixt-icon.svg'
import AstroIcon from '~/assets/images/ui/resources/ac-icon.svg'
import WasteIcon from '~/assets/images/ui/resources/waste-icon.svg'
import EnergyIcon from '~/assets/images/ui/resources/energy-icon.svg'
import type { Currency } from '@ix/base/composables/Utils/useCurrencies'

const { currency } = defineProps<{
  currency: Currency
}>()

const iconPath = computed(() => {
  switch (currency) {
    case 'waste': return WasteIcon
    case 'ixt': return IXTIcon
    case 'astro-credit': return AstroIcon
    case 'energy': return EnergyIcon
  }
})
</script>