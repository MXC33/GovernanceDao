<template lang="pug">
PopupBlank()
  VList(w="full" h="full")
    VList(w="full" pos="relative" m="auto" z="1000" max-w="275" color="white" h="lt-md:full" max-h="md:90%" overflow-y="auto" overflow-x="lt-md:hidden" corners="pink opacity-60" p="2")
      HList(gap="y-8 xl:0" w="full" items="center" min-h="65")
        VList(flex="~" flex-shrink="0" justify="center")
          div(cut="bottom-right b-ix-pink opacity-40 s-sm")
            img(src="/tour_img.png")

            HList(items="center" justify="between" p="4" b="t-1 ix-pink opacity-40" bg="ix-pink opacity-10")
              div()
                img(src="/siena-logo.svg")
              div()
                img(src="/LC-catt.svg")
        VList(flex-grow="1" h="full" p="t-10")
          div()
            p(color="ix-pink" text="10px" font="BDRmono" uppercase="~") URGENT MESSAGE

          VList(bg="gray-900" flex-grow="1" b="b-1 t-1 r-1 gray-700" rounded="r-1" p="x-10 y-8" space-y="8" text="base" color="gray-200" pos="relative")
            p(color="ix-white" font="bold") Arigato gozaimasu, for visiting Lucky Empire Jackpot!
            p() Win big in the jackpot raffle!
            p() All you need is a Territory and Ticket to enter the weekly raffle.
            p() Every week a random Country, Tier and Size is drawn!
            p() Feeling lucky?

            HList(pos="absolute" bottom="24px" right="24px" space-x="6px")
              div(bg="gray-50" w="10px" h="10px" rounded="full" cursor="pointer")
              div(bg="gray-500" w="10px" h="10px" rounded="full" cursor="pointer")
              div(bg="gray-500" w="10px" h="10px" rounded="full" cursor="pointer")

          div(flex="~" justify="end" m="t-6")
            ButtonItem(:value="'pink'" min-w="full md:330px" :text="'Next'" @click="onNext()" rounded="1" color="black")

</template>
<script lang="ts" setup>
const { closeActivePopup } = usePopups()

const onClose = () => {
  closeActivePopup()
}

</script>
