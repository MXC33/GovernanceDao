<template lang="pug">
ixtmaticIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange" v-if="title == 'IXT/MATIC (Sushiswap)'")
ixtusdtIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange" v-if="title == 'IXT/USDT (Quickswap)'")
lendCapitalIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange" v-if="title == 'LEND CAPITAL'")
polygonIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange" v-if="title == 'Polygon'")
swapIcon(w="10" h="10" p="1" fill="white group-hover:$mc-orange" v-if="title == 'Swap'")
</template>

<script lang="ts" setup>
import ixtmaticIcon from '~/assets/images/icons/dropdown/ixtmatic.svg'
import ixtusdtIcon from '~/assets/images/icons/dropdown/ixtusdt.svg'
import lendCapitalIcon from '~/assets/images/icons/dropdown/lend-capital.svg'
import polygonIcon from '~/assets/images/icons/dropdown/polygon.svg'
import swapIcon from '~/assets/images/icons/dropdown/swap.svg'

const props = defineProps<{
  title: string
}>()

</script>