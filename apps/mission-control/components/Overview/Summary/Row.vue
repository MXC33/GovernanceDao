<template lang="pug">
HList(justify="between" items="center" b="b-1 white opacity-40" pb="2")
  HList(align="center" items="center" space-x="2")
    div(b="1 white opacity-40" p="1")
      slot(name="icon")

    div(color="white") 
      slot(name="name")

  div(color="white" font="bold")
    div(px="4") 
      slot(name="amount")

</template>

<script lang="ts" setup>
</script>