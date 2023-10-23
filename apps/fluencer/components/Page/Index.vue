<template lang="pug">
VList()
  slot(name="header")

  VList(pos="relative" px="4 md:8" pb="8" space-y="8" )
    slot



  Transition(name="fade")
    VList(pos="fixed" inset="0" backdrop="~ blur-md" bg="ix-black opacity-30" z="5" v-if="!isLoggedInAndConnected" justify="center" items="center")
      HelperLoader(fill="ix-orange")



</template>

<script lang="ts" setup>
const { isLoggedInAndConnected } = useLogin()

</script>
