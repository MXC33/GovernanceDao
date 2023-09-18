<template lang="pug">
PopupBlank()
  VList(w="full" h="full")
    VList(w="full" pos="relative" m="auto" z="1000" max-w="250" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden" corners="pink opacity-60" p="2")
      div(grid="~ cols-1 xl:cols-8" gap="y-8 xl:0" w="full" items="center" min-h="65")
        VList(col="span-2" flex="~" justify="center")
          div(cut="bottom-right b-ix-pink opacity-60")
            img(src="~/assets/images/points.png")

            HList(items="center" justify="between" p="4" b="t-1 ix-pink opacity-40" bg="ix-pink opacity-20")
              div()
                img(src="~/assets/images/play-teaser.png")
              div()
                img(src="~/assets/images/play-teaser.png")
        VList(col="span-6" h="full" )
          div()
            p() URGENT MESSAGE

          VList(bg="gray-900" flex-grow="1" b="b-1 t-1 r-1 gray-700" rounded="r-1" p="x-10 y-8" space-y="8" text="base" color="gray-200")
            p(color="ix-white") Arigato gozaimasu, for visiting Lucky Empire Jackpot!
            p() Win big in the jackpot raffle!
            p() All you need is a Territory and Ticket to enter the weekly raffle.
            p() Every week a random Country, Tier and Size is drawn!
            p() Feeling lucky?

          div(flex="~" justify="end" m="t-6")
            ButtonItem(:value="'pink'" min-w="full md:330px" :text="'Next'" @click="onNext()" rounded="1" color="black")

</template>
<script lang="ts" setup>
const { closeActivePopup } = usePopups()

const onClose = () => {
  closeActivePopup()
}
</script>
