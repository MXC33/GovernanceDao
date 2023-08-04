<template lang="pug">
HList(text="md:ellipsis" bg="last:gray-900 group-hover:!gray-800" b="b-1 gray-600" min-h="80px" items="center" min-w="250px md:250px on-action:60px" max-w="full" w="full" p="r-6" :action="isButton")
  slot()
</template>

<script lang="ts" setup>
const { isButton } = defineProps<{
  isButton?: boolean
}>()
</script>