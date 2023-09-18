<template lang="pug">
ButtonSound(sound="lg" bg="mc-accent-20 hover:$mc-accent-40 on-selected:$mc-accent-60" cut="bottom-right s-md b-$mc-accent" p="x-3 y-3" w="full" shop-item="~ on-selected:selected" :selected="isSelected")
  HList(items="center" justify="between")
    HList(w="6" h="6" min-h="0" justify="center")
      component(:is="icon")
    HList(w="full" justify="center" align="right" space-x="2")
      span(text="white" uppercase="~")
        slot(name="price")

      span(text="$mc-accent" uppercase="~")
        slot(name="payType")
</template>

<script lang="ts" setup>
import MaticLogo from '~/assets/images/ui/wallet/payments/matic_logo.svg'
import TetherLogo from '~/assets/images/ui/wallet/payments/tether_logo.svg'
import IXTLogo from '~/assets/images/ui/wallet/payments/ixt-logo.svg'
import WETHLogo from '~/assets/images/ui/wallet/payments/weth-logo.svg'
import USDCLogo from '~/assets/images/ui/wallet/payments/usdc-logo.svg'

import type { Currency } from '~~/composables/corporations/useCorporationShop';

const props = defineProps<{
  tokenType: Currency
  isSelected: boolean
}>()

// const emit = defineEmits(["update:modelValue"])
// const item = useVModel(props, 'modelValue', emit)

const icon = computed(() => {
  switch (props.tokenType) {
    case 'matic': return MaticLogo
    case 'usdt': return TetherLogo
    case 'ixt': return IXTLogo
    case 'weth': return WETHLogo
    case 'usdc': return USDCLogo
  }
})

</script>