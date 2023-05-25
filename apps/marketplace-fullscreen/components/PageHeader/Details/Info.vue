<template lang="pug">
div()
  HList()
    TrashIcon(w="20" h="20" gray)
    VList(p ="3")
      div(text="white") {{title}} 
      div(text="gray") Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin libero diam

</template>
<script lang="ts" setup>
const props = defineProps<{
  title: string,
  isHovering?: boolean
}>()
import TrashIcon from '~/assets/icons/trash.svg'
//import Icon 
</script>