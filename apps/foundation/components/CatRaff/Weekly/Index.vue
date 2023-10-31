<template lang="pug">
div(overflow-x="auto" whitespace-nowrap)
  div(inline="flex" space-x="6")
    div(v-for="item in items" :key="item.id" w="300px") 
      Card()
        VList()
          TitleDetail(#default mb="6") Week
          TitleDetail(#detail) Oct 25, 2023
          TitleDetail(#detail) 00:00AM GMT
          TitleDetail(#detail) 2500 IXT
        template(#detailBottom)
          VList()
            div(grid="~ cols-2")
              div()
                TitleDetail(#default) 321823
                TitleDetail(#detail) Total Tickets
              div()
                TitleDetail(#default) 321823
                TitleDetail(#detail) Total Tickets
</template>
	
<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
  weeklyData: {
    type: Array as () => Array<{ id: number }>,
    required: false
  }
});



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
