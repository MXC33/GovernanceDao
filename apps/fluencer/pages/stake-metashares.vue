<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/metashare-cover.png")
      template(#title) METASHARES
      template(#description) Within Planet IX, Metashares work like any other form of corporate ownership. By staking your shares you ‘activate’ them and directly start to earn rewards from your shares. Without staking your shares you simply hold them in your wallet, without yielding rewards.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div My Metashares

      template(#default)
        DrawerContentBody()
          StakeMetashare(v-for="token in metashares" v-if="metashares && stakedData" :token="token" :staked-tokens="stakedData")

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div Staked Metashares

      template(#default)
        DrawerContentBody()
          ListItem(v-for="data in stakedData" v-if="stakedData")
            template(#image)
              TokenMedia(:token="data?.token")
            template(#title) {{ data?.token?.tokenInfo?.title }}
            template(#description)
              p Staked: {{ data?.userStakingData?.amountStaked }}
            template(#info)
              HList(space-x="2")
                div 30 day reward: 
                div(font="bold") {{ data?.userStakingData?.userRewardPerThirtyDays?.toFixed(2) }} IXT



    
</template>


<script lang="ts" setup>
import { filterMetashareType } from '~/composables/contracts/useMetashareStakingContract';
import { StakingId, type StakingItemFragment } from '~/.nuxt/gql/default';


const { data: tokens } = useTokenData()
const { data: stakedTokens } = useStakingData(StakingId.Metashare)

const stakedData = computed(() => stakedTokens.value?.stakingItems?.filter(item => filterMetashareType(item?.token)) as StakingItemFragment[])

const metashares = computed(() => {
  if (!tokens.value)
    return []
  return tokens.value.filter(item => filterMetashareType(item))
})


</script>