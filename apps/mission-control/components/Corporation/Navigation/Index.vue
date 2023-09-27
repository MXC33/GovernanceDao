<template lang="pug">
VList(pos="sticky bottom-0" bg="lt-md:$corporation-bg-color-80" py="0 md:8" backdrop="~ lt-md:blur-lg" z="2")
  CorporationWrapper(pos="relative")
    slot(name="beforeNavigation")

    div(flex="~ no-grow" justify="between" items="end")
      slot
</template>

<script lang="ts" setup>

</script>

<!-- b="lt-md:(t-1 $mc-accent-40)"  On VList -->