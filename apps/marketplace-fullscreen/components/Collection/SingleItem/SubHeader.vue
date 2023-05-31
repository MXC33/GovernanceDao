<template lang="pug">
HList(items="center" space-x="2")
  div(font="bold" translate-y="0.2")
    slot()
  CertifiedIcon(w="4.5")

</template>

<script lang="ts" setup>
import CertifiedIcon from '~/assets/icons/certified.svg'

</script>