<template lang="pug">
VList(text="xs" space-y="2")
  header(b="b-1 mc-white_40" pr="4" pb="1" mr="-4")
    h6(uppercase="~" text="white opacity-60")
      slot(name="header")

  VList(space-y="0.5" uppercase="~")
    slot

</template>

<script setup lang="ts">


</script>