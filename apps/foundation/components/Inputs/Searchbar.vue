<template lang="pug">
HList()
  input(type="text" v-model="searchQuery" placeholder="Search..." class="input")
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
const searchQuery = ref('');

const filterOptions = ['Option 1', 'Option 2', 'Option 3'];
const sortOptions = ['Ascending', 'Descending'];
const selectedFilter = ref('');
const selectedSort = ref('');

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
  height: 35px;
  font-size: 16px;
  line-height: 1.5;
}
</style>
  