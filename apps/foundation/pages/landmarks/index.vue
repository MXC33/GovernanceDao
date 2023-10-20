<template lang="pug">
Page()
  ButtonNav()
  PageSection(section="Rewards")
    HList(grid="~ gap-5")
      CardEarnings()
      ClaimTotalReward()
  PageSection(section="MyLandmarks")
  card(text-center)
    PageParagraphs(section="NoLandmarksPlaceholder")
  PageSection(section="ExploreLandmarks")
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