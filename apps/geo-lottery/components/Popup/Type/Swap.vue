<template lang="pug">
Popup()
  template(#content)
    VList(flex-grow="1" p="4" text="md" font="normal")
      SwapToken(m-y="2" order="1")
        template(#icon)
          IxtCircleBlackIcon(w="10")
        template(#title) Ix Token
        template(#balance) BALANACE: 2,547.12 IXT

      VList(justify="center" items="center" m-y="2" order="2")
        div(flex="~" justify="center" items="center" w="12" h="12" cursor="pointer" bg="ix-pink hover:opacity-80" rounded="full")
          SortArrowsIcon(w="5")

      SwapToken(m-y="2" order="3")
        template(#icon)
          AstroGoldCircleYellowIcon(w="10")
        template(#title) Astro Gold
        template(#balance) BALANACE: 399 AGOLD

  template(#footer)
    Button(:value="'pink'" w="full" mt="5") Swap

</template>
<script lang="ts" setup>
import IxtCircleBlackIcon from '~/assets/icons/token/ixt-circle-black.svg'
import AstroGoldCircleYellowIcon from '~/assets/icons/token/astro-gold-circle-yellow.svg'
import SortArrowsIcon from '~/assets/icons/sort-arrows.svg'
const { closeActivePopup } = usePopups()

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
