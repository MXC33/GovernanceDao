<template lang="pug">
HList(space-x="6" font="bold") TERRITORY 30 DAY YIELD:
  div
  HList(text="detail" items="center") AREA 
  HList(v-for="item in area" space-x="1")
    TerritoryBadge(:tier="item.tier")
    div(text="default") {{ item.item }} IXT

  HList(text="detail" items="center") SECTOR
  HList(v-for="item in sector" space-x="1")
    TerritoryBadge(:tier="item.tier")
    div(text="default") {{ item.item }} IXT

  HList(text="detail" items="center") ZONE 
  HList(v-for="item in zone" space-x="1")
    TerritoryBadge(:tier="item.tier")
    div(text="default") {{ item.item }} IXT

  HList(text="detail" items="center") DOMAIN 
  HList(v-for="item in domain" space-x="1")
    TerritoryBadge(:tier="item.tier")
    div(text="default") {{ item.item }} IXT

div(space-x="20")

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
