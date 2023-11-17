<template lang="pug">
HList(pos="fixed lg:top-6 lt-lg:bottom-6" z="3" w="full" justify="center" space-x="3" uppercase="~" )
  PageHeaderPill(color="#000" font="bold" display="lt-lg:none")
    LogoIcon(h="8")

    a(:href="`#${page}`" v-for="page in pages" color="on-active:white" :active="page == active") {{ $t(`header.${page}`) }}

  PageButton(bg="white" display="lg:none" color="black" @click="mobileMenuOpen = !mobileMenuOpen")
    MenuIcon(w="6")

  PageHeaderPill()
    a(:href="`#${pages[3]}`" color="on-active:white" :active="pages[3] == active") SWAP $MILK

  Transition(name="slide-bottom")
    VList(bg="black" pos="absolute left--3 right--3 bottom--6" v-if="mobileMenuOpen" p="6")
      button(@click="mobileMenuOpen = false" bg="pink" rounded="full" pos="absolute right-6 top-6" w="6" h="6" text="center")
        CloseIcon(w="3" pos="absolute-center")

      a(:href="`#${page}`" v-for="page in pages" color="on-active:pink" :active="page == active") {{ $t(`header.${page}`) }}


</template>

<script lang="ts" setup>
import CloseIcon from '~/assets/images/close.svg'
import LogoIcon from '~/assets/images/lucky-logo.svg'
import MenuIcon from '~/assets/images/menu.svg'
const active = useLuckyPage()
const pages = ["start", "about", "how", "buy"]
const mobileMenuOpen = ref(false)

// const onClickSwap = () => {
//   active.value = 'buy'
// }
</script>
