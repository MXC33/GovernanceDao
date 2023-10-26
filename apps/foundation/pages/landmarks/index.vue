<template lang="pug">
Page()
  ButtonNav()
  PageSection(section="Rewards")
    div(grid="~ gap-6 lg:cols-2")
      HList(col="lg:col-span-1" space-x="6") 
        Card(flex-grow="1")
          HList(justify="between")
            TitleDetail(icon="ixt")
              template(#detail) Earning per day
              template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserRewardPerDay, 4) }}
            TitleDetail(icon="ixt")
              template(#detail) Earning 30 day
              template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserRewardPerThirtyDays, 4) }}
        Card(flex-grow="1")
          HList( justify="between")
            TitleDetail(icon="ixt")
              template(#detail) Total Rewards
              template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserReward, 4) }}
            ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('general.claim')")
  PageSection(section="MyLandmarks")
  card(text-center)
    PageParagraphs(section="NoLandmarksPlaceholder")
  PageSection(section="ExploreLandmarks")
    div(grid="~ cols-2")
      div()
        InputsSearchbar()
      div(grid="~ cols-2")
        InputsDropdown(:options="filterOptions" v-model="selectedFilter" label="Filter by")
        InputsDropdown(:options="sortOptions" v-model="selectedSort" label="Sort by")
  CardLandmark()
</template>

<script lang="ts" setup>

import { type StakingItemFragment, StakingId } from '@ix/base/.nuxt/gql/default';

const activeSection = ref('area');
const activeSectionTop = ref('area');
const sections = ['area', 'sector', 'zone', 'domain'];

const { data: landmarkData } = useStakingData(StakingId.Landmark)




const { data } = defineProps<{
  data: StakingItemFragment
}>()


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