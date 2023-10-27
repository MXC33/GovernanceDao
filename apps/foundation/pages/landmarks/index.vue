<template lang="pug">
Page()
  ButtonNav()
  PageSection(section="Rewards")
    div(flex="~ col lg:cols-2 ")
      HList(flex="~ col lg:col-span-1 gap-6" )
        Card(flex-grow="1")
          HList(justify="between")
            TitleDetail(icon="ixt")
              template(#detail) {{ $t(`landmarks.earningsPerDay`) }}
              template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserRewardPerDay, 4) }}
            TitleDetail(icon="ixt")
              template(#detail) {{ $t(`landmarks.earningsPerMonth`) }}
              template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserRewardPerThirtyDays, 4) }}
        Card(flex-grow="1")
          HList( justify="between")
            TitleDetail(icon="ixt")
              template(#detail) {{ $t(`landmarks.totalRewards`) }}
              template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserReward, 4) }}
            ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('general.claim')")
  PageSection(section="MyLandmarks")

  Card(items="center")
    template(#default)
      div(v-if="true") No Landmarks Available
      div(v-if="false") No Landmarks Available


  PageSection(section="ExploreLandmarks")
    VList(z="999" space-x="6" gap="6")

      OptionDropDown()
        template(#selectedName) 
          div() Test

        template(#item="{item}")
          OptionRowSelect() {{ item }}

      OptionDropDown()
        template(#selectedName) 
          div() test

        template(#item="{item}")
          OptionRowSelect() {{ item }}

  LandmarkItem(:data="allLandmarkData")
</template>

<script lang="ts" setup>

import { type StakingItemFragment, StakingId } from '@ix/base/.nuxt/gql/default';

const sizeList = ['all', 'legendary', 'rare', 'uncommon', 'common', 'outlier']


const { data: landmarkData } = useStakingData(StakingId.Landmark)

const { execute: fetchAllLandmarks, data: allLandmarkData } = useAllLandmarkData(null, null, null, null)

await fetchAllLandmarks()


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