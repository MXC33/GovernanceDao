<template lang="pug">
VList(flex-grow="1" px="0 md:6" pos="relative" h="25vh" justify="center" items="center")
  .gradient-bg(pos="fixed left-0 right-0 top-12 md:top-16" h="50vh")

  VList(pos="relative" text="center" justify="center" items="center")
    img(src="~/assets/images/bundle-cover.png" w="24")

    h1(text="ix-orange xl") CONGRATULATIONS ON YOUR PURCHASE

</template>

<script lang="ts" setup>


</script>

<style>
.gradient-bg {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(203, 0, 16, 0.5) 100%);
}

.gradient-bg-account {
  background: rgb(12, 12, 12);
  background: linear-gradient(0deg, rgba(12, 12, 12, 0.5) 50%, rgba(99, 99, 99, 0.5) 100%);
}
</style>
