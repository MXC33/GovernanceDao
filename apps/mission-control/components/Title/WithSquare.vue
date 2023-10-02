<template lang="pug">
HList(items="center" space-x="2")
  div(w="1 md:2" flex="shrink-0" aspect="square" :bg="color ?? 'mc-mint'")

  VList(flex="~ col")
    p(:color="color ?? 'mc-mint'" uppercase="~" translate-y="0.4") 
      slot

</template>

<script setup lang="ts">

defineProps<{
  color?: string
}>()

</script>
