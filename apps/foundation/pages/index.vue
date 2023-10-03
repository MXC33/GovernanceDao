<template lang="pug">
VList(p="12" space-y="6")
  header(space-y="3")
    h2(text="3xl" font="bold" ) EARNING MULTIPLIERS
    p Earn greater rewards for staking for longer periods.

  div(grid="~ cols-4 gap-6" )
    Card(v-for="item in list")
      div(grid="~ cols-2 gap-3")
        VList()
          TitleDetail(#detail) 
          template Locking period
          template {{ item.lockingPeriod }}mths 

        VList()
          TitleDetail(#detail) 
          template Multiplier
          template {{ item.multiplier }}x 

    Card(grid="col-span-2")
      h3 Reward Pool

    CardDotted(grid="col-span-2")
      h3 Coming Soon 
      HList()
        button(btn="~ secondary") LEARN MORE

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

</script>