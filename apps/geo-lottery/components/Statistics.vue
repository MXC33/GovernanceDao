<template lang="pug">
div(flex="~" w="full")
  div(flex="~ col" align="center" text="base" p="y-6" bg="$mc-pink-blur" border-color="$mc-pink-60" border="1 r-0" w="6/12" rounded="l-1")
    div(color="$mc-gray-100")
      slot(name="content")
    div(font="bold")
      slot(name="number")
  div(text="base" align="center" p="y-6" bg="$mc-pink-blur" border-color="$mc-pink-60" border="1" w="6/12" rounded="r-1")
    div(color="$mc-gray-100")
      slot(name="content-2")
    div(font="bold")
      slot(name="number-2")

</template>

<script lang="ts" setup>
import CheckWarning from "~/components/CheckWarning.vue";

</script>
