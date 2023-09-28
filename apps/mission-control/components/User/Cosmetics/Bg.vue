<template lang="pug">
div(bg="black" pos="fixed" inset="0" z="999" flex="~ col" items="center" justify="center")
  div(@click="activePopup = null" cursor="pointer")
    //- IconDecora(display="none lg:block")
    IconLeftArrows(text="mc-orange" pos="absolute left-5 top-5 lg:left-30") {{$t(`general.back`)}}

  img(w="full" h="full" src="~/assets/images/stills/bg_space.png" object="cover" pos="absolute" z="-1" bg="black")

  slot
</template>

<script setup lang="ts">
const activePopup = usePopups()

</script>