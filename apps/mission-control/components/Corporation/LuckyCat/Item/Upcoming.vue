<template lang="pug">
div(align="left") {{ prizes.join(', ') }}
div(align="left") Live: {{ readableDate() }}
  
</template>
  
  
<script lang="ts" setup>

import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';
import { format } from 'date-fns'
const props = defineProps<{
  item: CorporationRaffleItem
}>()


const readableDate = () => format(props.item.dailyTickets.startTime * 1000, 'dd.MM.yyyy / HH:mm')

const prizes = computed(() => props.item.prize.items.map(item => item.token.tokenInfo.title))

</script>
  