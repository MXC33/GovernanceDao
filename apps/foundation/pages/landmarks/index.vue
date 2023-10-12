<template lang="pug">
Page()
  PageSection(section="rewards")
    HList(grid="~ gap-4 ")
      CardEarnings()
      MetashareClaimHorizontal()
  PageSection(section="myLandmarks")
  card()
    p No landmarks available
  PageSection(section="explore")
    HList()
      InputsSearchbar()
      InputsDropdown(:options="filterOptions" v-model="selectedFilter" label="Filter by")
      InputsDropdown(:options="sortOptions" v-model="selectedSort" label="Sort by")
  CardLandmark()
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const filterOptions = ['Option 1', 'Option 2', 'Option 3'];
const sortOptions = ['Ascending', 'Descending'];
const selectedFilter = ref('');
const selectedSort = ref('');
</script>

<style scoped>
.input-container {
  display: flex;
  gap: 10px;
}
</style>