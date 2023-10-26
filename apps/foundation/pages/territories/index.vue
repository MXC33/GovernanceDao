<template lang="pug">
Page()
  ButtonNav()

  PageSection(section="StakingTitle")

  HList(space-x="12")
    ButtonTopTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSectionTop = section")

  TerritoryBoxes(:data="filteredTerritories" v-if="filteredTerritories")

  div(space-y="12")
    PageSection(section="TerritoryTitle")
    HList()
      CardEarnings(:data="data")
      ClaimTotalReward()

  HList(space-x="12")
    ButtonTerritories(v-for="section in sections" :key="section"  :label="section" @click="activeSection = $event")
  PageSection(v-if="activeSection === 'area'" section="ContentArea")

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

console.log("territoryData", territoryData)

</script>