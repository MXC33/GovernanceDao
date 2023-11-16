<template lang="pug">
PageWrapper(bg="black" page="start")
  img(src="~/assets/images/rocket.jpg" pos="image" opacity="50")
  VList(justify="center" flex-grow="1")
    div(grid="~ lg:cols-2" pos="relative" mt="12")
      VList(justify="center" items="center" order="lt-lg:1")
        VList(space-y="3" p="6")
          LogoCoin()

          div(text="xl" font="bold prime" uppercase="~" v-html="$t('intro.description')")

          HList()
            PageButton(:text="$t('general.buy')" mt="6")

      VList(pos="relative" justify="center" items="center")
        LogoIcon(w="60%" h="auto" pos="relative")

  PageBanner(pos="relative")
</template>

<script lang="ts" setup>
import LogoIcon from '~/assets/images/milk-coin.svg'
import LogoCoin from '~/assets/images/logo.svg'

</script>