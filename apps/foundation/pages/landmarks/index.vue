<template lang="pug">
Page()
  PageSection(section="rewards" :primary="true")
  HList()
    Card()
    MetashareClaimHorizontal()
  PageSection(section="myLandmarks")
  card()
    p No landmarks available
  PageSection(section="explore")
    div.input-container
      input(type="text" v-model="searchQuery" placeholder="Search...")
      select(v-model="filterOption")
        option(value="" disabled selected) Filter by...
        option(value="option1") Option 1
        option(value="option2") Option 2
        option(value="option3") Option 3
      select(v-model="sortOption")
        option(value="" disabled selected) Sort by...
        option(value="asc") Ascending
        option(value="desc") Descending
  </template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref('');
const filterOption = ref('');
const sortOption = ref('');


</script>
