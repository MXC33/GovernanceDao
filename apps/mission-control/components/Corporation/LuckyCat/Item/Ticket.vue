<template lang="pug">
HList(mr="8")
  div(pos="relative")
    LuckyWinner(v-if="isWinner" w="15" h="15")
    RegularTicket(w="5" v-if="showRegularTicket" opacity="80")
    PremiumTicket(w="5" v-if="showPremiumTicket" opacity="80")
    GoldenTicket(w="5" v-if="showGoldenTicket" opacity="80")
    AddTicket(v-if="item.entriesByWallet == 0 && item.state == 'active'" w="5" h="5" pos="absolute" top="-2" right="-2")
    div(v-else-if="!isWinner && item.state != 'upcoming'" leading="3.5" bg="$mc-accent" pos="absolute" top="-2" right="-2" px="1" py="1" rounded="full" h="5" :min-w="5")
      span(mr="0.2") {{item.entriesByWallet}}
          
  
</template>


<script  lang="ts" setup>
import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';

import RegularTicket from '~~/assets/images/ui/corporations/lucky-cat/regular-ticket.svg'
import PremiumTicket from '~~/assets/images/ui/corporations/lucky-cat/premium-ticket.svg'
import GoldenTicket from '~~/assets/images/ui/corporations/lucky-cat/golden-ticket.svg'
import AddTicket from '~~/assets/images/ui/corporations/lucky-cat/add-ticket.svg'
import LuckyWinner from '~~/assets/images/ui/corporations/lucky-cat/cat-winner.svg'



const props = defineProps<{
  item: CorporationRaffleItem
}>()
const { walletAdress } = useWallet()

const isWinner = computed(() => props.item?.winnings?.some(item => item.walletAddress == walletAdress.value))

const showRegularTicket = computed(() => props.item.dailyTickets.ticket.tokenId == 16 && isWinner.value != true)
const showPremiumTicket = computed(() => props.item.dailyTickets.ticket.tokenId == 17 && isWinner.value != true)
const showGoldenTicket = computed(() => props.item.dailyTickets.ticket.tokenId == 18 && isWinner.value != true)

</script>

