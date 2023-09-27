<template lang="pug">
div(flex="~ col md:row" p="y10 md:y4" gap="5 md:10" justify="start")

  IconFrameWithCorner(flex="~ row md:col" p="x5 y4 md:x5 y2" b="0.1 mc-mint_40 hover:mc-mint_60" cursor="pointer" gap="8 md:2")

    div(flex="~ row md:col" bg="mc-black_20" cursor="pointer" justify="center")
      img(object="contain" w="74px md:auto" :src="$config.s3 + addCacheKey('/nft/images/starter-pack/icon-m-sm.png')")

    div(flex="~ row md:col" justify="center" items="center" uppercase="~" p="0 md:4" text="mc-white" font="bold")
      span(align="center" v-html:="$t(`notifications.beginnerOffer.expressM`)")

    div(flex="~ col md:row" items="center" justify="center" gap="0 md:3" font="bold")
      span.line(color="mc-orange_60") {{$t(`notifications.beginnerOffer.price.medium.normal`)}}
      span(color="mc-orange") {{$t(`notifications.beginnerOffer.price.medium.sale`)}}

  IconFrameWithCorner(flex="~ row md:col" p="x5 y4 md:x5 y2" b="0.1 mc-mint_40 hover:mc-mint_60" cursor="pointer" gap="8 md:2")

    div(flex="~ row md:col" bg="mc-black_20" cursor="pointer" justify="center")
      img(object="contain" w="74px md:auto" :src="config.s3 + addCacheKey('/nft/images/starter-pack/icon-s-sm.png')")

    div(flex="~ row md:col" justify="center" items="center" uppercase="~" p="0 md:4" text="mc-white" font="bold")
      span(align="center" v-html:="$t(`notifications.beginnerOffer.expressS`)")

    div(flex="~ col md:row" items="center" justify="center" gap="0 md:3" font="bold")
      span.line(color="mc-orange_60") {{$t(`notifications.beginnerOffer.price.small.normal`)}}
      span(color="mc-orange") {{$t(`notifications.beginnerOffer.price.small.sale`)}}

</template>
<script lang="ts" setup>
const { addCacheKey } = useCacheKey()
const { public: config } = useRuntimeConfig()

defineProps<{
  isSelected?: boolean,
  isActive?: boolean,
}>()

</script>
<style>
.glow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}

.line {
  text-decoration: line-through 0.7px var(--mc-orange);
}
</style>