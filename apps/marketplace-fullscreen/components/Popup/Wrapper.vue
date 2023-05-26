<template lang="pug">
VList(pos="fixed" inset="0" bg="black opacity-10" w="full" h="full" z="9998" text="white" backdrop="~ blur-16" items="center" justify="center" pointer-events="auto" @click="$emit('close')" font="foundry")
  slot()
</template>

<script lang="ts" setup>
defineEmits(["close"])
</script>