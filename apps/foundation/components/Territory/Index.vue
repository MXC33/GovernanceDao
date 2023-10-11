<template lang="pug">
Card()
  HList()
    ul(v-for="territory, index in territories" :key="index" p=6 class="list-none pl-0")
      li(text="m" mb="2" color="gray-300") {{ territory.title }}
      li(text="2xl" font="bold") {{ territory.data }}
</template>
  
  
<script lang="ts" setup>
import { defineProps } from 'vue';

interface Territory {
  title: string;
  data: string | number;
}

const props = defineProps({
  category: {
    type: String,
    required: true
  }
});

const territories: Territory[] = [
  {
    title: "Category",
    data: props.category,
  },
  {
    title: "Staked",
    data: 0,
  },
  {
    title: "TVL",
    data: 0
  },
  {
    title: "Daily IXT/Share",
    data: 0
  }
];
</script>
