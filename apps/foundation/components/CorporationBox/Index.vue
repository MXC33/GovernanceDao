<template lang="pug">
VList(bg="gray-800" w="xl" p="6" flex-center="~" b="0.5 white opacity-20")
  div(grid="~ col" b="solid red 1" p="6")
    h4(text="3xl") Trade
    div(grid="~ row")
      p Share: [Dynamic Value]
      p IXT per share 30 days: [Dynamic Value]
      button(btn="secondary") VIEW ON MARKETPLACE
  div(grid="~ col" b="solid purple 1")
    h4(text="3xl") Staking
    CorporationBoxList(grid="~ row")
  Claim(p="6")

</template>

<script lang="ts" setup>


interface BoxTitles {
  title: string
}

const boxTitles: BoxTitles = [{
  title: "GravityGrade"
},
{
  title: "AstroCap"
},
{
  title: "NetEmpire"
},
{
  title: "EternaLab"
},
{
  title: "LuckyCat"
},
{
  title: "NewLands"
}, {
  title: "Y_"
}, {
  title: "Global Waste Systems"
}
]


</script>