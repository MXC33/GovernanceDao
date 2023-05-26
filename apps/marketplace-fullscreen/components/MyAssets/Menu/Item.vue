<template lang="pug">
button(text="md" uppercase="~" font="bold" @click="onSelectMenuItem") {{ item }} 
    
</template>
      
<script lang="ts" setup>

const props = defineProps<{
  item: string
}>()

const onSelectMenuItem = () => {
  console.log("clicked", props.item)
}



</script>
      
  