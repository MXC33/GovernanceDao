<template lang="pug">
div(translate-y="-0.5")
  IXTIcon(w="5" v-if="icon == 'ixt'")
  img(src="~/assets/png/EnergyIcon.png" w="5" v-else-if="icon == 'energy'")
  UsdtIXT_Icon(w="6.5" v-else-if="icon == 'ixtusdt'")
  MaticIXT_Icon(w="6.5" v-else-if="icon == 'ixtmatic'")


</template>
  
<script lang="ts" setup>
import IXTIcon from '~/assets/images/token.svg'
import UsdtIXT_Icon from '~/assets/images/usdt_ix.svg'
import MaticIXT_Icon from '~/assets/images/matic_ix.svg'

defineProps<{
  icon?: 'ixt' | 'energy' | 'ixtmatic' | 'ixtusdt'
}>()

</script>