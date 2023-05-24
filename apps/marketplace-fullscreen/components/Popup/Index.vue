<template lang="pug">
div(pos="fixed" inset="0" bg="black opacity-80" z="300" @click="$emit('close')")

div(pos="fixed top-50% left-50%" w="full" translate-x="-50%" translate-y="-50%" bg="ix-black" m="auto" z="310" rounded="2" b="1 white" max-w="120" color="white")
  VList(p="x-3 y-3" text="center" b="b-1 white" v-if="$slots.header")
    slot(name="header")

  VList(p="6" flex-grow="1")
    slot()

  VList(b="t-1 white" p="6" v-if="$slots.footer")
    slot(name="footer")
</template>

<script setup lang="ts">
defineEmits(["close"])
</script>