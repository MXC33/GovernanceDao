<template lang="pug">
VList()
  VList(h="12" max-w="94" bg="black" justify="center")
    HList(uppercase="~" items="center" justify="between" px="8" font="bold" cursor="pointer")
      span(color="white" text="md")
        slot(name="header")
      ChevronIcon(w="5" translate-y="-0.35" fill="white")

  div(b="0.5 gray-600")

  HList(uppercase="~")
    slot()


</template>

<script lang="ts" setup>
import ChevronIcon from '~/assets/icons/chevron-down.svg'

</script>