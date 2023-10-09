<template lang="pug">
HList( bg="gray-800" p="6" rounded="xl" b="0.5 white opacity-20")
  ul(v-for="territory, index in territories" :key="index" p=6)
    li(text="s") {{ territory.title }}
    li(text="s") {{ territory.data }}
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
