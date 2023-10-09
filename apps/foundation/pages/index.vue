<template lang="pug">
VList(space-y="6")
  Stake()
  header(space-y="3")
    h2(text="3xl" font="bold") EARNING MULTIPLIERS
    p Earn greater rewards for staking for longer periods

  div(grid="~ cols-4 gap-6")
    Card(v-for="item in list" )
      div(grid="~ cols-2 gap-6")
        TitleDetail()
          template(#detail) Locking Period 
          template(#default) {{ item.lockingPeriod }} months 

        TitleDetail()
          template(#detail) Multiplier
          template(#default) {{ item.multiplier }} x

    Card(grid="col-span-2")
      h3 Reward Pool

    CardDotted(grid="col-span-2")
      h3 Coming Soon 
      HList()
        button(btn="~ secondary") LEARN MORE

    button(btn="~ primary") CONNECT WALLET TO STAKE

  h3(text="3xl") YOUR TERRITORIES
  p Explore your territory NFTs and their total payout amounts

  div(grid="~ cols-2" p="12" )
    StakingWrapper()

  div(grid="~ cols-2 gap-6" )
    StakingWrapper()

  div(grid="~ cols-2 gap-6" )
    StakingWrapper()

  div(grid="~ cols-2 gap-6" )
    StakingWrapper()


</template>


<script lang="ts" setup>

interface StakingInfo {
  lockingPeriod: number,
  multiplier: number
}

const list: StakingInfo[] = [{
  lockingPeriod: 12,
  multiplier: 4
},
{
  lockingPeriod: 6,
  multiplier: 2.5
},
{
  lockingPeriod: 3,
  multiplier: 1.5
},
{
  lockingPeriod: 1,
  multiplier: 1
}
]

interface YourTerritories {
  territory: string,
  staked: string,
  amount: number
}

const territories: YourTerritories[] = [{
  territory: "TERRITORY NFT STAKING",
  staked: "Total Staked",
  amount: 0
},
{
  territory: "ENERGY STAKING",
  staked: "Total Staked:",
  amount: 0
},
{
  territory: "LANDMARK NFT STAKING",
  staked: "Total Staked:",
  amount: 0

}
]

</script>