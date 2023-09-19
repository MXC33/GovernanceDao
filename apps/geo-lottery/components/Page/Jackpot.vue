<template lang="pug">
VList(space-y="8 md:17")
  div(space-y="3 md:4" color="ix-white" font="bold" text="lg")
    h2(color="ix-white" text="3xl md:4xl xl:5xl" uppercase="~" font="bdrA3mik") The Jackpot
    p() On top of the three prizes drawn every round, there is also a weekly chance to bring home the jackpot! For each round a random longitude and latitude is selected. This position correlates to one specific PIX out of the 1.7 billion that make up Planet IX. If you are the owner of that PIX, have built a territory in that position and hold a lottery ticket, the jackpot is yours!

  div(grid="~ cols-1 xl:cols-4" gap="y-8 xl:0" w="full" bg="black" b="1 ix-pink" rounded="2xl" items="center" min-h="65")
    div(col="span-1" flex="~" justify="center")
      img(src="~/assets/images/map_pink.png")
      //video(src="/luckcat-jackpot-orbs-s.mp4" w="full" h="full" autoplay loop playsinline muted opacity="100" transition="all duration-500" object="cover center on-contain:contain" contain="contain")
    VList(col="span-2"  p="4" space-y="4" items="center xl:start")
      HList(gap="x-7" flex="~ row wrap md:nowrap" justify="center md:start" text="center sm:left")
        VList(space-y="1")
          h3(color="ix-pink" text="xl" font="bold" uppercase="~") Longitude
          h4(color="ix-white" text="2xl" font="bdrA3mik" v-if="!isLoaded") -
          h4(color="ix-white" text="2xl" font="bdrA3mik" v-else) {{convertDDToDMS(lon, false).toString}}
        VList()
          h3(color="ix-pink" text="xl" font="bold" uppercase="~") Latitude
          h4(color="ix-white" text="2xl" font="bdrA3mik" v-if="!isLoaded") -
          h4(color="ix-white" text="2xl" font="bdrA3mik" v-else) {{convertDDToDMS(lat, true).toString}}
        VList()
          h3(color="ix-pink" text="xl" font="bold" uppercase="~") Territory
          h4(color="ix-white" text="2xl" font="bdrA3mik" v-if="!isLoaded") -
          h4(color="ix-white" text="2xl" font="bdrA3mik" v-else) {{hasWinner ? 'YES' : 'NO'}}
      VList()
        h2(color="ix-pink" text="4xl md:5xl xl:7xl" uppercase="~" font="bdrA3mik" v-if="!isLoaded") WAITING.
        template(v-else)
          h2(color="ix-pink" text="4xl md:5xl xl:7xl" uppercase="~" font="bdrA3mik" v-if="!hasWinner") NO DICE.
          h2(color="ix-yellow" text="4xl md:5xl xl:7xl" uppercase="~" font="bdrA3mik" v-else) JACKPOT!
    div(col="span-1" flex="~" items="start" justify="center xl:end" h="full")
      div()
        img(src="~/assets/images/jackpot_map.png")
</template>
<script lang="ts" setup>
import {useLottery} from "~/composables/useLottery";

const { weeksDraw } = useLottery()

const isLoaded = ref<boolean>(false)
const hasWinner = ref<boolean>(false)
const lat = ref<number>(0)
const lon = ref<number>(0)
const player_id = ref<number|null>(null)

watch(weeksDraw, (state) => {
  if (!state.jackpot)
    return

  const jackpot = state.jackpot

  hasWinner.value = jackpot.has_winner
  lat.value = jackpot.lat
  lon.value = jackpot.lon
  player_id.value = jackpot.player_id

  isLoaded.value = true
})

const convertDDToDMS = (D: number, lng: boolean) => {
  const deg = 0 | (D < 0 ? (D = -D) : D)
  const min = 0 | (((D += 1e-9) % 1) * 60)
  const sec = (0 | (((D * 60) % 1) * 6000)) / 100
  const dir = D < 0 ? (lng ? "W" : "S") : lng ? "E" : "N"
  const toString = deg +'°'+ min +'’'+ sec +'°'+ dir

  return {
    dir,
    deg,
    min,
    sec,
    toString
  };
}
</script>
<style>
</style>
