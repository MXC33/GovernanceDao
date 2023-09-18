<template lang="pug">
SlideoutSubmenuWrapper(:sub-menu-open="subMenuOpen")
  template(#sub-menu) 
    slot(name="sub-menu")

  template(#default)
    VList(flex-grow="1" min-h="0" space-y="4")
      VList(pos="sticky top-0" bg="black" z="1")
        slot(name="tabs")

      Transition(name="fade-slow" mode="out-in")
        slot(name="default")

        
</template>

<script setup lang="ts">
defineProps<{
  subMenuOpen: boolean
}>()
</script>