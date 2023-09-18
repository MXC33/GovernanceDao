<template lang="pug">
ListItemOutline(:accented="true" :is-large="true" text="normal" :item="item" :is-selected="isSelected")
  template(#carousel)
    Carousel(h="100" :items-to-show="1" :autoplay="2000" :wrap-around="true" v-if="tokens.length > 1")
      Slide(v-for="(token, index) in tokens" :key="index")
        TokenImage(:token="token" :is-large="true" pos="absolute" w="full" h="full" inset="0")

    TokenImage(:token="tokens[0]" :is-large="true" pos="absolute" w="full" h="full" inset="0" v-else)

  template(#default)
    TitleWithIcon(icon="half-circle" fill="$mc-accent" font="bold" color="$mc-accent") {{ raffleId }}

    CorporationLuckyCatItemActive(:item="item" v-if="item.state == 'active'")
    CorporationLuckyCatItemPast(:item="item" v-if="item.state == 'past'")
    CorporationLuckyCatItemUpcoming(:item="item" v-if="item.state == 'upcoming'")
    CorporationLuckyCatItemMyEntries(:item="item" v-if="item.state == 'my'")


  template(#rightSlot)
    CorporationLuckyCatItemTicket(:item="item")

    
</template>

<script lang="ts" setup>
import type { CorporationRaffleItem } from '~~/composables/corporations/useCorporationRaffle';
import { Carousel, Slide } from 'vue3-carousel'

const props = defineProps<{
  isSelected?: boolean
  item: CorporationRaffleItem
}>()

const tokens = computed(() => props.item.prize.items.map(item => item.token))
const raffleId = computed(() => 'RAFFLE #' + props.item.id)

</script>
