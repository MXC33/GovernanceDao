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
            ButtonGlitch(btn="~ primary-outline-cut" @click="claimAllRewards" :text="$t('general.claim')")

        PageSection(section="MyLandmarks")
          LandmarkUserItem(:data="landmarkStakingItems" v-if="landmarkStakingItems?.length > 0")
          div(v-else) No Landmarks Available


  PageSection(section="ExploreLandmarks")
    div(grid="~ cols-3 gap-6" z="999")
      InputsSearchbar( @input="search")
      OptionDropDown(:items="tierList")
        template(#selectedName) 
          div() {{ tier }}

        template(#item="{item}")
          OptionRowSelect(:selected="tier == item" @click="tier = item") {{ item }}

      OptionDropDown(:items="sortList")
        template(#selectedName) 
          div() {{ spaceBetween(sort ?? "") }}

        template(#item="{item}")
          OptionRowSelect(:selected="sort == item" @click="sort = item") {{ item }}

  LandmarkItem(:data="data")
</template>

<script lang="ts" setup>

import type { NftFragment } from '@ix/base/.nuxt/gql/default';
import { StakingId, LandmarkSort, LandmarkTier } from '@ix/base/.nuxt/gql/default';

const { claimAllLandmarkRewards } = useLandmarkStakingContract()


const sort = ref<LandmarkSort>(LandmarkSort.EarningHighToLow)
const tier = ref<LandmarkTier>(LandmarkTier.Legendary)
const page = ref(1)

const { refresh: fetchAllLandmarks, data: allLandmarkData } = useAllLandmarkData(null, null, tier.value, sort.value)
await fetchAllLandmarks()

const data = ref<NftFragment | null>(allLandmarkData.value)


const sortList = Object.values(LandmarkSort)
const tierList = Object.values(LandmarkTier)

const spaceBetween = (text: string) => text.replace(/([A-Z])/g, ' $1').trim()

const { data: landmarkData } = useStakingData(StakingId.Landmark)

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
