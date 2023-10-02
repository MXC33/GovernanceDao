<template lang="pug">
VList(p="3 lg:5" space-y="2" b="b-1 mc-accent opacity-20")
  h3(text="mc-accent left lg" uppercase="~" v-if="$slots.title") 
    slot(name="title")
    slot(name="titleTwo")

  div(grid="~ cols-1 auto-row" space-y="2")
    slot
</template>

<script setup lang="ts">
</script>