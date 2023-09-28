<template lang="pug">
VList
  HList(justify="between")
    HList(space-x="2" justify="center" items="center" align="center")
      VList(w="8" h="8" b="1 mc-white_40" p="1" items="center" align="center" justify="center")
        slot(name="icon")

      div(color="mc-white" font="normal")
        slot(name="title")

    HList(px="4" items="center")

      div(color="mc-mint" font="bold")
        slot(name="perk")

  div(b="b-1 mc-white_40" mt="2" mb="2")

</template>
<script lang="ts" setup>

</script>