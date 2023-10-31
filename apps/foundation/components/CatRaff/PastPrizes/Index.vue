<template lang="pug">
div.scrollable-container
  div.scrollable-content
    div.grid-item(v-for="item in items" :key="item.id") 
      Card()
        TitleDetail(#default) Week #69
        TitleDetail(#detail) Oct 25, 2023
        TitleDetail(#detail) 00:00AM GMT
        TitleDetail(#detail) 2500 IXT


</template>
	
<script lang="ts" setup>
// Bara för o test rendrera items
const items = [
  { id: 1, content: 'Item 1' },
  { id: 2, content: 'Item 2' },
  { id: 3, content: 'Item 3' },
  { id: 4, content: 'Item 4' },
  { id: 5, content: 'Item 5' },
  { id: 6, content: 'Item 6' },
  { id: 7, content: 'Item 7' },
  { id: 8, content: 'Item 8' },
  { id: 9, content: 'Item 9' },
];


</script>

<style>
.scrollable-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap; 
}

.scrollable-content {
  display: inline-flex; 
}

.grid-item {
  width: 150px; 
  height: 100px; 
  margin-right: 20px; 
}



</style>