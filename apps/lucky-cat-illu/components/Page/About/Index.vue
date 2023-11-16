<template lang="pug">
PageWrapper(page="about")
  img(src="~/assets/images/star-bg.jpg" pos="absolute" inset="0" w="full" h="full" object="cover")

  PageWrapperContent(justify="center" items="center")
    div(grid="~ xl:cols-2 gap-16" h="full")
      PageBubble()
        h3(text="4xl pink" font="bdra") {{ $t('about.header') }}
        div(text="lg" font="prime" v-html="$t('about.description')")

      PageAboutPrice(:prices="activePrice" flex-grow="1")
        HList(space-x="4" justify="end" text="sm")
          button(v-for="key in Object.keys(priceList)" flex="~ col" cursor="pointer" rounded="full" items="center" space-y="2" filter="on-inactive:grayscale" :inactive="selected != key" transition="all" @click="setSelected(key)" opacity="hover:90")
            img(:src="`/images/coin/${key}.png`" min-w="0" min-h="0" p="2" b="2 pink" w="18" aspect="square" rounded="full")
            span(font="bold" color="pink") ${{key}}

</template>

<script lang="ts" setup>
const doge = [0.00055878, 0.00851684, 0.054080, 0.061928, 0.058961, 0.731578]
const shiba = [0.000000000516950, 0.00003532, 0.00000882, 0.00000779, 0.00002845, 0.00008616]
const pepe = [0.000000064982, 0.000000200586, 0.000000265188, 0.000000390993, 0.00000161, 0.00000431]
const floki = [0.00000140, 0.00000291, 0.00000487, 0.00006095, 0.00007673, 0.00033651]
const ape = [7.40, 12.61, 12.70, 10.90, 17.04, 25.97]
const priceList = {
  doge,
  shiba,
  pepe,
  floki,
  ape
} as const

type CoinType = keyof typeof priceList

const selected = ref<CoinType>("doge")
const activePrice = computed(() => priceList[selected.value])
const setSelected = (key: string) => {
  selected.value = key as CoinType
}
</script>