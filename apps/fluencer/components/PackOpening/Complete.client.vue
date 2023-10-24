<template lang="pug">
Teleport(to="#overlays")
  PopupBase(v-if="openedItems.length > 0" @close="openedItems = []")
    template(#header) SUCCESSFULLY OPENED

    template(#icon)
      CheckboxIcon(w="6" h="6")

    template(#default)
      VList(min-h="30" frame="~ gray-500")
        VList(aspect="square" min-h="0" w="full")
          TokenSlideshow(:tokens="openedItems" v-if="openedItems.length > 1" :image="true")
          TokenMedia(v-else-if="openedItems.length == 1" :token="openedItems[0]" fill="cover")

        VList()
          HList(bg="gray-800 odd:gray-700" justify="between" v-for="item in openedItems" font="bold" p="3")
            TokenName(:token="item")
            div x{{ item.balance }}

    template(#buttons)
      button(btn="~ primary" @click="openedItems = []") Continue

</template>

<script lang="ts" setup>
import CheckboxIcon from '~/assets/images/checkmark-green.svg'
const openedItems = usePackContent()

</script>