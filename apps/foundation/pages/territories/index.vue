<template lang="pug">
Page()
  ButtonNav()

  PageSection(section="StakingTitle")

  HList(space-x="12")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSectionTop = section")

  TerritoryBoxes(:data="filteredTerritories" v-if="filteredTerritories")

  PageSection(section="TerritoryTitle")
  div(grid="~ gap-6 lg:cols-2")
    HList(col="lg:col-span-1" space-x="6") 
      Card(flex-grow="1")
        HList(justify="between")
          TitleDetail(icon="ixt")
            template(#detail) Earning per day
            template(#default) {{ roundToDecimals(territoryUserData?.userSpecificStakingData?.totalUserRewardPerDay, 4) }}
          TitleDetail(icon="ixt")
            template(#detail) Earning 30 day
            template(#default) {{ roundToDecimals(territoryUserData?.userSpecificStakingData?.totalUserRewardPerThirtyDays, 4) }}
      Card(flex-grow="1")
        HList( justify="between")
          TitleDetail(icon="ixt")
            template(#detail) Total Rewards
            template(#default) {{ roundToDecimals(territoryUserData?.userSpecificStakingData?.totalUserReward, 4) }}
          ButtonGlitch(btn="~ primary-outline-cut" @click="claimAllRewards" :text="$t('general.claim')")



  HList(space-x="12")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSection = section")

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
    div(grid="~ cols-3 gap-6" flex-grow="1")
      TerritoryItem(v-for="data in filteredUserTerritories" :data="data" :staked="stakeSort == 'staked'" v-if="filteredUserTerritories?.length > 0")
      Card(v-else flex-grow="1" items="center" font="bold")
        template(#default)
          div() {{ $t(`territories.noContent.${activeSection}`) }}


</template>

<script lang="ts" setup>

import { type StakingItemFragment, StakingId, type NftFragment } from '@ix/base/.nuxt/gql/default';

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