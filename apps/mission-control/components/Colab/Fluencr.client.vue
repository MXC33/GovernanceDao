<template lang="pug">
div(pt="0 md:0 lg:10" pl="0 md:0 lg:10" pos="absolute top-14 left-0 lg:top-12 left-0" flex-grow="1")
  div(max-w="md:100% lg:60% xl:38%")
    NuxtLink(to="https://fluencr.xyz/checkout/base?aid=a733FFa5268a582E28314C4208991DF2CE729f87" :external="true" target="_blank")
      img(src="~/assets/images/ui/ads/fluencr/fluencr-ad.png" v-if="!isMobile")
      img(src="~/assets/images/ui/ads/fluencr/fluencr-ad-mobile.png" v-else)

</template>

<script lang="ts" setup>
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint('lg')

</script>

