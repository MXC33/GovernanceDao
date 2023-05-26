<template lang="pug">
div()
  HList(p ="3" color="hover:red")
    VList()
      div() {{title}} 
      div(color="gray") {{description}}
</template>
<script lang="ts" setup>

const props = defineProps<{
  title: string,
  description: string,
}>()


// @click="$emit(title)"
//defineEmits(['clicked'])
</script>