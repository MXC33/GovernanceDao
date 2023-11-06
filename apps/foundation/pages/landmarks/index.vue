<template lang="pug">
Page()
  PageSection(section="Rewards")
    div(grid="~ cols-1 lg:cols-4 gap-6")
      Card()
        HList(justify="between")
          TitleDetail(icon="ixt")
            template(#detail) {{ $t(`landmarks.earningsPerDay`) }}
            template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserRewardPerDay, 4) }}
          TitleDetail(icon="ixt")
            template(#detail) {{ $t(`landmarks.earningsPerMonth`) }}
            template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserRewardPerThirtyDays, 4) }}

      Card()
        HList(justify="between")
          CircleBackground(position="absolute" class="top-0 left-0 w-1/2" h="100%")
          TitleDetail(icon="ixt")
            template(#detail) {{ $t(`landmarks.totalRewards`) }}
            template(#default) {{ roundToDecimals(landmarkData?.userSpecificStakingData?.totalUserReward, 4) }}
        Disabler(:disabled="!canClaim")
          ButtonGlitch(btn="~ primary-outline-cut" @click="claimAllRewards" :text="$t('general.claim')")


  PageSection(section="MyLandmarks")
    LandmarkUserList(:data="landmarkStakingItems" v-if="landmarkStakingItems?.length > 0")
    div(v-else) No Landmarks Available



  PageSection(section="ExploreLandmarks")
    div(grid="~ cols-3 gap-6" z="20")
      InputsSearchbar( @input="search")
      OptionDropDown(:items="tierList")
        template(#selectedName) 
          div() {{ tier }}

        template(#item="{item}")
          OptionRowSelect(:selected="tier == item" @click="tier = item") {{ spaceBetween(item) }}

      OptionDropDown(:items="sortList")
        template(#selectedName) 
          div() {{ spaceBetween(sort ?? "") }}

        template(#item="{item}")
          OptionRowSelect(:selected="sort == item" @click="sort = item" ) {{ spaceBetween(item) }}

  LandmarkItem(:data="data")
</template>

<script lang="ts" setup>

import type { NftFragment } from '@ix/base/.nuxt/gql/default';
import { StakingId, LandmarkSort, LandmarkTier } from '@ix/base/.nuxt/gql/default';

import CircleBackground from '~/assets/images/circles.svg'

const { claimAllLandmarkRewards } = useLandmarkStakingContract()


const sort = ref<LandmarkSort>(LandmarkSort.EarningHighToLow)
const tier = ref<LandmarkTier>(LandmarkTier.Legendary)
const page = ref(1)

const { refresh: fetchAllLandmarks, data: allLandmarkData } = useAllLandmarkData(null, null, tier.value, sort.value)
await fetchAllLandmarks()

const data = ref<NftFragment | null>(allLandmarkData.value)


const sortList = Object.values(LandmarkSort)
const tierList = Object.values(LandmarkTier)

const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const spaceBetween = (text: string) => {
  const words = text.replace(/([A-Z])/g, ' $1').trim().split(' ');
  if (words.length > 1) {
    words[0] = words[0] + ' -';
  }
  const spacedText = words.join(' ');
  return capitalizeFirstLetter(spacedText);
}


const { data: landmarkData } = useStakingData(StakingId.Landmark)

const canClaim = computed(() => landmarkData.value?.userSpecificStakingData?.totalUserReward ?? 0 > 0)

const search = async (searchText: string) => {
  const { refresh: fetchAllLandmarks, data: allLandmarkData } = useAllLandmarkData(page.value, searchText, tier.value, sort.value)

  await fetchAllLandmarks()

  data.value = allLandmarkData.value
}


watch([page, sort, tier],
  async ([page, sort, tier]) => {
    const { refresh: refreshAllLandmarks, data: allLandmarkData } = useAllLandmarkData(page, null, tier, sort)

    await refreshAllLandmarks()

    data.value = allLandmarkData.value
  })

const landmarkStakingItems = computed(() => landmarkData.value?.stakingItems ?? [])


const claimAllRewards = () => {
  return claimAllLandmarkRewards()
}

</script>
