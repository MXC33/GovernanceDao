<template lang="pug">
Popup()
  template(#default)
    HList(items="center" justify="center" text="2xl" pt="6" font="bold" uppercase="~")
      h3() Congratulations!

    VList(flex-grow="1" items="center" justify="center" text="md center" font="normal" space-y="6")
      VList(items="center" text="center")
        p(max-w="sm:80%") Your account has been credited with the requested funds. Hope the luck be with you!
      HList(justify="center" items="center")
        HList(m-x="3" space-x="2" items="center" order="1")
          IxtCircleBlackIcon(w="8")
          span() 30 IXT

        HList(m-x="3" justify="center" items="center" order="2")
          ArrowRightIcon(w="3")

        HList(m-x="3" space-x="2" justify="center" items="center" order="3")
          AstroGoldCircleYellowIcon(w="8")
          span() 30 AGOLD

  template(#footer)
    Button(:value="'pink'" w="full") Back To Purchase Tickets

</template>
<script lang="ts" setup>
import IxtCircleBlackIcon from '~/assets/icons/token/ixt-circle-black.svg'
import AstroGoldCircleYellowIcon from '~/assets/icons/token/astro-gold-circle-yellow.svg'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg'
const { closeActivePopup } = usePopups()

const onClickAssets = () => {
  navigateTo('/')
  return closeActivePopup()
}

defineEmits(["close"])
</script>
