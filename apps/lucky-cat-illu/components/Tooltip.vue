<template lang="pug">
Transition(name="fade")
  div(v-if="isActive" pos="absolute bottom-full left-50%" translate-y="-6" translate-x="-50%" bg="gray-300 opacity-20" rounded="lg" p="2" text="xs" uppercase="~")
    slot
</template>

<script lang="ts" setup>
const isActive = defineModel<Boolean>()
</script>