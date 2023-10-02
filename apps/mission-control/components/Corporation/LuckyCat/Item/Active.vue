<template lang="pug">
VList(align="left")
  div Entries left: {{ entriesLeft }}
  div Time Left: {{countdown}}

</template>


<script lang="ts" setup>

import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';

const props = defineProps<{
  item: CorporationRaffleItem
}>()

const entriesLeft = computed(() => props.item.dailyTickets.maxTotalEntries - props.item.totalEntries)

const countdown = useTimer((props.item.dailyTickets.startTime + props.item.dailyTickets.duration) * 1000)


</script>
