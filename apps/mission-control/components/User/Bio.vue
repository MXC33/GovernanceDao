<template lang="pug">
PopupFullscreen(@close="activePopup = null")
  template(v-slot:header)
    UserHeader(v-if="!isMobile")

  template(v-slot:default)
    div(flex="~ col" p="x-15 y-6" justify="center" v-if="!isMobile" uppercase="~")
      div(flex="~ row" mt="6" justify="between" space-x="20")
        UserImage
        UserInfo
        UserStatistics
      UserShowcase

    UserBioMobile(v-else)
</template>

<script setup lang="ts">
import UserHeader from '~/assets/images/ui/user/user-header.svg'
const activePopup = usePopups()
const { useMobileBreakpoint } = useDevice()
const isMobile = useMobileBreakpoint()
</script>