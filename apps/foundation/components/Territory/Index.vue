<template lang="pug">
Card()
  div(class="grid grid-cols-2 gap-6 lg:grid-cols-4")
    TitleDetail()
      template(#detail) Category
      template(#default)
        HList(space-x="1")
          TerritoryTierIcon(w="4" translate-y="-0.5")
          div(capitalize="~") {{ data?.token?.tokenInfo?.tier }}
    TitleDetail()
      template(#detail) Staked
      template(#default) {{ data.userStakingData?.amountStaked }}
    TitleDetail()
      template(#detail) TVL
      template(#default) {{ data.totalStaked }}
    TitleDetail(icon="ixt")
      template(#detail) Daily IXT/Share
      template(#default) {{ roundToDecimals(data.rewardPerDay) }}
</template>
  
  
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { data } = defineProps<{
  data: StakingItemFragment
}>()

const TerritoryTierIcon = await import(`../../public/assets/svg/${data?.token?.tokenInfo?.tier}-badge.svg?component`).catch(() => '')



</script>