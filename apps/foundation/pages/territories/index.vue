<template lang="pug">
Page()
  ButtonNav()

  PageSection(section="StakingTitle")

  HList(space-x="12")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSectionTop = section")

  TerritoryBoxes(:data="filteredTerritories" v-if="filteredTerritories")

  PageSection(section="TerritoryTitle")
  div(grid="~ cols-2 gap-6")
    HList(col="span-1" space-x="6")
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
          ButtonGlitch(btn="~ primary-outline-cut" @click="$emit('claim')" :text="$t('general.claim')")



  HList(space-x="12")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSection = section")

  PageSection(:section="`content.${activeSection}`")

  HList(space-x="6")
    TerritoryItem(v-for="data in filteredUserTerritories" :data="data" v-if="filteredUserTerritories?.length > 0")
    Card(v-else flex-grow="1" items="center" font="bold")
      template(#default)
        div() {{ $t(`territories.noContent.${activeSection}`) }}


</template>

<script lang="ts" setup>

import { type StakingItemFragment, StakingId } from '@ix/base/.nuxt/gql/default';

const activeSection = ref('area');
const activeSectionTop = ref('area');
const sections = ['area', 'sector', 'zone', 'domain'];

const { data: territoryData } = useStakingData(StakingId.Territories)
const { data: territoryUserData } = useStakingData(StakingId.TerritoriesUser)



const { data } = defineProps<{
  data: StakingItemFragment
}>()

const filteredTerritories = computed(() => {
  const filtered = territoryData.value?.stakingItems.filter(item => item?.token?.tokenInfo.type == activeSectionTop.value) as StakingItemFragment[]
  console.log("filtered", filtered)
  return filtered
})


const filteredUserTerritories = computed(() => {
  const filtered = territoryUserData.value?.stakingItems.filter(item => item?.token?.tokenInfo.type == activeSection.value) as StakingItemFragment[]
  console.log("filtered", filtered)
  return filtered
})

</script>