<template lang="pug">
LifiWidgetComponent(w="80" h="80" :config="widgetConfig")
</template>

<script lang="ts" setup>
import { LiFiWidget, type WidgetConfig } from '@lifi/widget';
import { applyPureReactInVue } from 'veaury';
const LifiWidgetComponent = applyPureReactInVue(LiFiWidget)
const { token } = useRuntimeConfig().public

const widgetConfig: WidgetConfig = {
  fromChain: 137,
  fromToken: '0x0000000000000000000000000000000000001010',
  toToken: token,
  toChain: 1,
  integrator: '$MILK',
  containerStyle: {
    borderRadius: '16px',
  },
}
</script>