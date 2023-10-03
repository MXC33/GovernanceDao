<template lang="pug">
CorporationWrapper(flex="~ row" justify="between" bg="$corporation-header-color" h="12" items="center" flex-shrink="0")
  CorporationDecorationLogo(:key="id")

  nuxt-link(display="block" to="/mission-control" flex="~ row" items="center" opacity="hover:70" transition="opacity")
    LogoutIcon(w="7" h="auto" object="contain" fill="$corporation-header-text-color")
</template>

<script lang="ts" setup>
import LogoutIcon from '~/assets/images/ui/logout.svg'
const id = useActiveCorporation()

</script>