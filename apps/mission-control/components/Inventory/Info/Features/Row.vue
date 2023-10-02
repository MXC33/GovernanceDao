<template lang="pug">
HList(justify="between" items="center" b="1 mc-orange opacity-20" p="2" uppercase="~")
  div(color="mc-orange") 
    slot(name="left")

  div(font="bold") 
    slot(name="right")

</template>

<script setup lang="ts">
</script>