<template lang="pug">
input(type="text" v-model="searchQuery" placeholder="Search..." class="input")
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
const searchQuery = ref('');
</script>
  
<style scoped>
.input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: black;
  color: white;
  width: 100%;
  box-sizing: border-box;
}
</style>
  