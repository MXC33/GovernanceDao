<template lang="pug">
img(w="full" h="full" :src="imageSource" object="cover" pos="absolute" inset="0" pointer-events="none" display="lt-md:none" opacity="40")
</template>

<script setup lang="ts">
import Background1 from "~/assets/images/stills/inventory-1.jpg"
import Background2 from "~/assets/images/stills/inventory-2.jpg"
import Background3 from "~/assets/images/stills/inventory-3.jpg"

const imageSource = ref(null)

const dice = Math.random()
if (dice < 0.33)
  imageSource.value = Background1
else if (dice < 0.66)
  imageSource.value = Background2
else
  imageSource.value = Background3

</script>