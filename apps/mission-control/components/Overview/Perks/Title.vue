<template lang="pug">
HList(flex="~ row" items="center" gap="2" b="b-1 mc-white_40" p="y-2" mb="2" pos="relative")
  div(color="mc-white_60" uppercase="~" font="bold")
    slot(name="header")

  slot(name="info")
  
</template>

<script lang="ts" setup>
</script>