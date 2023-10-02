<template lang="pug">
VList(cursor="pointer" font="bold")
  InfoIcon(w="5" h="5" opacity="60")
  slot(name="info")

</template>

<script lang="ts" setup>
import InfoIcon from '~/assets/images/ui/resources/info-icon.svg'

</script>