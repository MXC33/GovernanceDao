<template lang="pug">
BannerGroup() 
  div TERRITORY 30 DAY YIELD:

  HList(items="center" space-x="2")
    div(text="detail") AREA 
    BannerGroupItem(v-for="item in area")
      TerritoryBadge(:tier="item.tier")
      div(text="default") {{ item.item }} IXT

  HList(items="center" space-x="2")
    div(text="detail") SECTOR 
    BannerGroupItem(v-for="item in sector")
      TerritoryBadge(:tier="item.tier")
      div(text="default") {{ item.item }} IXT


  HList(items="center" space-x="2")
    div(text="detail") ZONE 
    BannerGroupItem(v-for="item in zone")
      TerritoryBadge(:tier="item.tier")
      div(text="default") {{ item.item }} IXT

  HList(items="center" space-x="2")
    div(text="detail") DOMAIN 
    BannerGroupItem(v-for="item in domain")
      TerritoryBadge(:tier="item.tier")
      div(text="default") {{ item.item }} IXT

</template>
      
<script lang="ts" setup>
const { territoryRewardPer30Day, } = useStakingPools()

const tiers = ['legendary', 'rare', 'uncommon', 'common', 'outlier']

const area = territoryRewardPer30Day('area').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})


const sector = territoryRewardPer30Day('sector').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})

const zone = territoryRewardPer30Day('zone').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})

const domain = territoryRewardPer30Day('domain').map((item, index) => {
  return {
    item: roundToDecimals(item),
    tier: tiers[index]
  }
})


</script>
