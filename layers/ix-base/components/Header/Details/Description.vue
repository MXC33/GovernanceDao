<template lang="pug">
div()
  HList(:class="{ 'hovered': isHovered }" @mouseover="isHovered = true" @mouseleave="isHovered = false" p="3" :color="isHovered ? 'red' : ''")
    TrashIcon(w="10" h="10" p="1")
    VList()
      div() {{title}} 
      div(:style="{ color: isHovered ? 'red' : 'gray' }") {{ description }}
</template>
<script lang="ts" setup>
import TrashIcon from '~/assets/icons/trash.svg'
const props = defineProps<{
  title: string,
  description: string,
  isHovered?: boolean
}>()
const isHovered = ref(false)
</script>
<style scoped>
.hovered {
  color: red;
}
</style>