<template lang="pug">
div()
  HList(p ="3" color="hover:red")
    TrashIcon(w="10" h="10" p="1")
    VList()
      div() {{title}} 
      div(color="gray") {{description}}
</template>
<script lang="ts" setup>
import TrashIcon from '~/assets/icons/trash.svg'

const props = defineProps<{
  title: string,
  description: string,
}>()

// @click="$emit(title)"
//defineEmits(['clicked'])
</script>