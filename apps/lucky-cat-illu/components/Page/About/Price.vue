<template lang="pug">
PageBubble(uppercase="~")
  VList(space-y="6" pt="6" px="xl:6" flex-grow="1" h="full")
    div(grid="~ cols-2" flex-grow="1" h="full")
      VList(space-y="6" pt="3")
        VList()
          div() Price at launch
          div(text="xl")
            GlitchText(:text="String(priceAtLaunch)" prefix="$")

        VList()
          div() ATH
          div(text="xl")
            GlitchText(:text="String(priceAtPeak)" prefix="$")

        VList()
          div() Growth
          div(text="mint xl" font="bold")
            GlitchText(:text="'+' + String(priceGrowth)" )

      HList(items="end" justify="end" w="full" space-x="3")
        div(bg="mint" v-for="price in prices" :style="{height: getMaxPercentage(price) + '%'}" w="6" transition="all")

    slot

</template>

<script lang="ts" setup>
const { prices } = defineProps<{
  prices: number[]
}>()
const priceAtLaunch = computed(() => prices[0])
const priceAtPeak = computed(() => prices[prices.length - 1])
const priceGrowth = computed(() => roundToDecimals(getPercentage(priceAtPeak.value), 2))

const getPercentage = (x: number) =>
  (x / priceAtLaunch.value) * 100

const getMaxPercentage = (x: number) =>
  (x / priceAtPeak.value) * 100

</script>