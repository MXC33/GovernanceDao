<template lang="pug">
Page()
  PageSection(section="StakingTitle")

    HList(space-x="3")
      ButtonTerritories(v-for="section in sections" :key="section" :isSelected="activeSectionTop == section" :label="section" @click="activeSectionTop = section")

    TerritoryBoxes(:data="filteredTerritories" v-if="filteredTerritories")

  PageSection(section="TerritoryTitle")
    div(grid="~ cols-1 lg:cols-4 gap-6")
      Card(flex-grow="1")
        HList(justify="between")
          TitleDetail(icon="ixt")
            template(#detail) Earning per day
            template(#default) {{ roundToDecimals(territoryUserData?.userSpecificStakingData?.totalUserRewardPerDay, 4) }}
          TitleDetail(icon="ixt")
            template(#detail) Earning 30 day
            template(#default) {{ roundToDecimals(territoryUserData?.userSpecificStakingData?.totalUserRewardPerThirtyDays, 4) }}

      Card(flex-grow="1")
        HList(justify="between")
          CircleBackground(position="absolute" class="top-0 left-0 w-1/2" h="100%")
          TitleDetail(icon="ixt")
            template(#detail) Total Rewards
            template(#default) {{ roundToDecimals(territoryUserData?.userSpecificStakingData?.totalUserReward, 4) }}
        Disabler(:disabled="!canClaim")
          ButtonGlitch(btn="~ primary-outline-cut" @click="claimAllRewards" :text="$t('general.claim')")




  HList(space-x="3")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" :isSelected="activeSection == section" @click="activeSection = section")

  PageSection(:section="`content.${activeSection}`")

    HList(z="999" space-x="6")
      OptionDropDown(:items="sizeList" :left="true")
        template(#selectedName) 
          div() {{sizeSort}}

        template(#item="{item}")
          OptionRowSelect(:selected="sizeSort == item" @click="sizeSort = item" capitalize="~") {{ item }}

      OptionDropDown(:items="stakeList" :left="true")
        template(#selectedName) 
          div() {{stakeSort}}

        template(#item="{item}")
          OptionRowSelect(:selected="stakeSort == item" @click="stakeSort = item" capitalize="~") {{ item }}


    HList()
      div(grid="~ md:cols-3 gap-6" flex-grow="1")
        TerritoryItem(v-for="data in filteredUserTerritories" :data="data" :staked="stakeSort == 'staked'" v-if="filteredUserTerritories?.length > 0")
        Card(v-else flex-grow="1" items="center" font="bold")
          template(#default)
            div() {{ $t(`territories.noContent.${activeSection}`) }}


</template>

<script lang="ts" setup>

import { type StakingItemFragment, StakingId, type NftFragment } from '@ix/base/.nuxt/gql/default';

import CircleBackground from '~/assets/images/circles.svg'

const activeSection = ref('area');
const activeSectionTop = ref('area');
const sizeSort = ref('all')
const stakeSort = ref('staked')

const sections = ['area', 'sector', 'zone', 'domain'];
const stakeList = ['staked', 'unstaked']
const sizeList = ['all', 'legendary', 'rare', 'uncommon', 'common', 'outlier']

const { data: territoryData } = useStakingData(StakingId.Territories)
const { data: territoryUserData } = useStakingData(StakingId.TerritoriesUser)

const { data: allUserTerritories, execute: fetchAllUserTerritories } = useTerritoryData()

await fetchAllUserTerritories()

const { claimAllTerritoryRewards } = useTerritoryStakingContract()

const claimAllRewards = () => {
  return claimAllTerritoryRewards()
}

const canClaim = computed(() => territoryUserData.value?.userSpecificStakingData?.totalUserReward ?? 0 > 0)

const filteredTerritories = computed(() => {
  const filtered = territoryData.value?.stakingItems.filter(item => item?.token?.tokenInfo.type == activeSectionTop.value) as StakingItemFragment[]
  return filtered
})

const filterTokens = (token: NftFragment) => {
  return token.tokenInfo.type == activeSection.value && sizeSort.value == 'all' ? true : token.tokenInfo.tier == sizeSort.value
}

const filteredUserTerritories = computed(() => {
  if (stakeSort.value == 'staked') {
    const filtered = territoryUserData.value?.stakingItems.filter(item => filterTokens(item?.token)) as StakingItemFragment[]
    return filtered
  }
  else {
    return allUserTerritories.value?.filter(token => filterTokens(token)) as NftFragment[]
  }
})

</script>