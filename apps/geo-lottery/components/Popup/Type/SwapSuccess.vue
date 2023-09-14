<template lang="pug">
Popup(:hideCloseButton="true")
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList(items="center" text="center")
        p(max-w="sm:80%") Your account has been credited with the requested funds. Hope the luck be with you!
      HList(justify="center" items="center")
        HList(m-x="3" space-x="2" items="center" :order="popup.tokenSwapOrder === 'IXT-AGOLD' ? '1' : '3'")
          IxtCircleBlackIcon(w="8")
          span() {{popup.value}} IXT

        HList(m-x="3" justify="center" items="center" order="2")
          ArrowRightIcon(w="3")

        HList(m-x="3" space-x="2" justify="center" items="center" :order="popup.tokenSwapOrder === 'IXT-AGOLD' ? '3' : '1'")
          AstroGoldCircleYellowIcon(w="8")
          span() {{popup.value}} AGOLD

  template(#footer)
    ButtonItem(:value="'pink'" :text="'Back To Purchase Tickets'" @click="onBack()" v-if="popup.backModal" )
    ButtonItem(:value="'pink'" :text="'CLOSE'" @click="onClose()" v-else)

</template>
<script lang="ts" setup>
import IxtCircleBlackIcon from '~/assets/icons/token/ixt-circle-black.svg'
import AstroGoldCircleYellowIcon from '~/assets/icons/token/astro-gold-circle-yellow.svg'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg'

const { popup, displayPopup, closeActivePopup } = usePopups()

const onBack = (() => {
  displayPopup({
    type: popup.value?.backModal,
    backModal: popup.value?.parentBackModal
  })
})
const onClose = (() => {
  closeActivePopup()
})

</script>
