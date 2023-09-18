<template lang="pug">
.popup-fullscreen(w="full" bg="black" pos="absolute" inset="0" z="0" align="center" flex="~ col")

  //IconDecora(v-if="!isMobile")

  img(w="full" h="full" src="~/assets/images/stills/bg_room.png" object="cover" pos="absolute" inset="0" z="-1" opacity="50" bg="black" pointer-events="none")

  div(grid="~ cols-4")
    div(self="start" flex="~ col")
      slot(name="leftButton")

    div(grid="col-span-2" flex="~ col")
      div(max-w="70 lg:120" w="full" justify="center" mx="auto")
        slot(name="header")

    div(self="start" flex="~ col grow" w="full" items="end")
      ButtonCloseTab(@click="$emit('close')" v-if="!$slots.rightButton")
      slot(name="rightButton" v-else)

  slot
</template>

<script setup lang="ts">
const isMobile = useMobileBreakpoint()
defineEmits(["close"])
</script>