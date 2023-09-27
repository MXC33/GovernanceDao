<template lang="pug">
div(align="left") ENTRIES: {{ item.totalEntries }} / {{ item.dailyTickets.maxTotalEntries }}
HList(align="left" text="$mc-accent" v-if="hasWonRaffle" pos="relative") YOU WON
  Checkmark(v-if="hasClaimedRaffle" w="5" h="5" ml="0.5")
div(align="left" text="$mc-accent" v-else) {{ noOfWinners}} 
  
</template>
  
  
<script lang="ts" setup>

import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';
import Checkmark from '~~/assets/images/ui/corporations/lucky-cat/checkmark.svg'

const props = defineProps<{
  item: CorporationRaffleItem
}>()

const { hasWonRaffle } = useLuckyCatRaffle(props.item)

const walletAddresses = computed(() => props.item?.winnings?.map(item => item?.walletAddress))

const noOfWinners = computed(() => {

  if (!props.item?.winnings)
    return 'Not drawn'

  if (walletAddresses.value.length == 0)
    return '0 WINNERS'

  const uniqueWalletAddresses = new Set(walletAddresses.value);
  return uniqueWalletAddresses.size > 1 ? `${uniqueWalletAddresses.size} WINNERS` : `${uniqueWalletAddresses.size} WINNER`
});

const hasClaimedRaffle = computed(() => props.item?.hasClaimed)

</script>
  