<template lang="pug">
HList(space-x="4" w="full" justify="start" items="center" bg="gray-800" frame="~ gray-500" p="3")
  InputCheckbox(v-model="isAgreed")
    span(color="gray-200") I have read, understand, and agree to the <a href="">Terms of Service.</a>
</template>

<script lang="ts" setup>
const isAgreed = defineModel<boolean>()
</script>