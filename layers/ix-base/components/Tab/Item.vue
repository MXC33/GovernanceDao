<template lang="pug">
VList(pos="relative")
  HList(font="bold" px="0" py="3" uppercase="~" cursor="pointer" items="center" space-x="2")
    span(color="white on-inactive:(opacity-50 hover:opacity-75)" :inactive="!isActive" transition="all")
      slot

    HList(pos="relative" w="5" h="5" bg="ix-primary" items="center" justify="center" rounded="full" v-if="notifications")
      div(color="white" text="xs" leading="1em" translate-y="5.4%" translate-x="-8%") {{ notifications }}

  Transition(name="fade-slow")
    div(w="full" b="b-0 on-active:b-3.43 ix-primary" z="4" pos="absolute bottom-0" v-if="isActive" :active="isActive" transition="all")


</template>
  
<script lang="ts" setup>

defineProps<{
  notifications?: number
  isActive?: boolean
}>()

</script>