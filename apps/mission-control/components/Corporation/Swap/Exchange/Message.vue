<template lang="pug">
HList(scrollbar="md:(~ mc)" items="start" min-h="md:0")
  CorporationAvatar(:corporation="'astro-cap'" pos="sticky top-0" w="auto md:80")

  VList(px="2 md:5" text="xs md:sm")
    article.accent-swapmsg(display="none md:block" v-html="$t(`corporations.astro-cap.swap.exchange-message`)")
    article.accent-swapmsg(display="block md:none" v-html="$t(`corporations.astro-cap.swap.exchange-message-mobile`)")
</template>

<script lang="ts" setup>

</script>
