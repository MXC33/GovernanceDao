<template lang="pug">
Card()
  div(class="grid grid-cols-2 gap-default lg:grid-cols-4")
    TitleDetail()
      template(#detail) Category
      template(#default)
        HList(space-x="1")
          TerritoryBadge(:tier="data?.token?.tokenInfo?.tier")
    TitleDetail()
      template(#detail) Staked
      template(#default) {{ data.userStakingData?.amountStaked }}
    TitleDetail()
      template(#detail) TVL
      template(#default) {{ data.totalStaked }}
    TitleDetail(icon="ixt")
      template(#detail) Daily IXT/Share
      template(#default) {{ roundToDecimals(data.rewardPerDay,5) }}
</template>
  
  
  
<script lang="ts" setup>
import type { StakingItemFragment } from '#gql';


const { data } = defineProps<{
  data: StakingItemFragment
}>()

</script>