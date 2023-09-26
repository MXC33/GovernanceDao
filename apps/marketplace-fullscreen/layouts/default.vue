<template lang="pug">
main(w="full" h="full" flex="~ col grow" min-h="100vh")
  Header()

  VList(flex-grow="1" justify="top")
    PageHeader(v-if="!onLogin")

    Cart()

    //- Used for teleports
    div(id="overlays" select="none")

    VList(pos="relative" flex-grow="1")
      slot
      
</template>

<script lang="ts" setup>
const route = useRoute()
const onLogin = computed(() => route.name == "connect")
</script>
