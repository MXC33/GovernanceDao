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
    LandmarkUserItem(:data="landmarkStakingItems" v-if="landmarkStakingItems.length > 0")
    div(v-else) No Landmarks Available


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

const landmarkStakingItems = computed(() => landmarkData.value?.stakingItems ?? [])


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