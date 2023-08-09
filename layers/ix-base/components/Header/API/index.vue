<template lang="pug">
VList(pos="fixed right-0 bottom-0 top-12" w="md:100" inset="lt-md:0" bg="black" overflow-y="auto" m="!l-0" z="200" )
  HeaderAPIAccount(@close="$emit('close')")
  HeaderAPIMenu()
  HeaderAPIButtonDisconnect(pos="sticky bottom-0" z="1")
</template>

<script lang="ts" setup>
defineEmits(['close'])
// const { isBannerActive } = useAds()
// const isMobile = useMobileBreakpoint('lg')
//s-adBannerDesktop:top-21 s-adBannerMobil:top-18
//:state="getBannerStatues"
// const getBannerStatues = computed(() => {
//   if(isBannerActive.value && !isMobile.value)
//     return 'adBannerDesktop'
//   if(isBannerActive.value && isMobile.value)
//     return 'adBannerMobil'
//   return ''
// })
</script>