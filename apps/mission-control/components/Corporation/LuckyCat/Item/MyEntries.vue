<template lang="pug">
div(align="left") My Entries: {{ item.entriesByWallet }} / {{ item.dailyTickets.maxEntriesPerWallet }}
HList(align="left" text="$mc-accent" v-if="hasWonRaffle" pos="relative") YOU WON
  Checkmark(v-if="hasClaimedRaffle" w="5" h="5" ml="1")
div(align="left" text="$mc-accent" v-if="raffleIsActive && !hasWonRaffle") {{ countdown }}
div(align="left" text="white" v-else-if="!hasWonRaffle") NO LUCK

  
</template>
  
  
<script lang="ts" setup>

import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';
import Checkmark from '~~/assets/images/ui/corporations/lucky-cat/checkmark.svg'


const props = defineProps<{
  item: CorporationRaffleItem
}>()

const countdown = useTimer((props.item?.dailyTickets?.startTime + props.item?.dailyTickets?.duration) * 1000)

const { hasWonRaffle, raffleIsActive } = useLuckyCatRaffle(props.item)

const hasClaimedRaffle = computed(() => props.item?.hasClaimed)

</script>
  