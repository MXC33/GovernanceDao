<template lang="pug">
Page()
  template(#header)
    PageHeader()
      template(#icon): img(src="~/assets/images/ixt-cover.png")
      template(#title) IXT
      template(#description) Within Planet IX, Metashares work like any other form of corporate ownership. By staking your shares you ‘activate’ them and directly start to earn rewards from your shares. Without staking your shares you simply hold them in your wallet, without yielding rewards.

  template(#default)
    PageTabs()

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900" max-h="auto")
      template(#header)
        div Stake your IXT

      template(#default)
        DrawerContentBody(space-y="6")
          ListItem()
            template(#image)
              img(src="~/assets/images/ixt-coin.png")
            template(#title)
              span(text="detail") My balance

            template(#description)
              div
                span(text="subheading") {{ixtBalanceRounded}} IXT 
                span(text="detail") ${{usdBalanceRounded}}

          Divider(mx="-6")

          VList(space-y="3")
            PageSubTitle() Duration

            div(grid="~ cols-4 gap-3")
              button(btn="~ form on-active:form-active" v-for="period in stakePeriods" capitalize="~" :active="activePeriod.months == period.months" @click="selectPeriod(period)" flex="~ col") 
                div(font="bold") {{ formattedMonths(period.months) }}
                div(text="detail") {{ period.apy }}%

          Divider(mx="-6")

          VList()
            PriceRow()
              template(#left): span(text="detail") Quantity
              template(#right): span(text="detail-value") {{ixtBalanceRounded}} IXT

            PriceRow()
              template(#left): span(text="detail") Staking period
              template(#right)
                div(text="detail-value")
                  GlitchText(:text="formattedMonths(activePeriod.months)")

            PriceRow()
              template(#left): span(text="detail") APY
              template(#right)
                div(text="detail-value")
                  GlitchText(:text="activePeriod.apy + '%'")

          PriceRow()
            template(#left)
              PageSubTitle() Projected Total

            template(#right) 
              h3(space-x="2")
                span(text="subheading") {{projectedIxtBalanceRounded}} IXT
                span(text="detail") ${{projectedUsdBalanceRounded}}

    DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900")
      template(#header)
        div Staked IXT

      template(#default)
        DrawerContentBody()
          ListItem(v-for="data in userStakePeriods")
            template(#image)
              img(src="~/assets/images/ixt-coin.png")
            template(#title) {{ data.months }} Month
            template(#description)
              p Staked: {{ data.stakedAmount }}
            template(#info)
              HList(space-x="2")
                div Reward: 
                div(font="bold") {{ data?.reward }} IXT

</template>


<script lang="ts" setup>
import { StakingId } from '../.nuxt/gql/default';


const { data: ixtOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { data: ixtThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { data: ixtSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { data: ixtTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)


interface StakePeriod {
  months: number
  apy: number,
}

interface UserStakePeriod {
  months: number
  stakedAmount?: number
  reward?: number
}
const stakePeriods: StakePeriod[] = [{
  months: 1,
  apy: getAPY(ixtOneMonthData.value?.stakingItems[0]?.rewardRate, ixtOneMonthData.value?.totalStakedAmount)
}, {
  months: 3,
  apy: getAPY(ixtThreeMonthData.value?.stakingItems[0]?.rewardRate, ixtThreeMonthData.value?.totalStakedAmount)
}, {
  months: 6,
  apy: getAPY(ixtSixMonthData.value?.stakingItems[0]?.rewardRate, ixtSixMonthData.value?.totalStakedAmount)
}, {
  months: 12,
  apy: getAPY(ixtTwelveMonthData.value?.stakingItems[0]?.rewardRate, ixtTwelveMonthData.value?.totalStakedAmount)
}]

const userStakePeriods: UserStakePeriod[] = [{
  months: 1,
  stakedAmount: ixtOneMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked ?? 0,
  reward: ixtOneMonthData.value?.stakingItems[0]?.userStakingData?.totalReward ?? 0
}, {
  months: 3,
  stakedAmount: ixtThreeMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked ?? 0,
  reward: ixtThreeMonthData.value?.stakingItems[0]?.userStakingData?.totalReward ?? 0
}, {
  months: 6,
  stakedAmount: ixtSixMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked ?? 0,
  reward: ixtSixMonthData.value?.stakingItems[0]?.userStakingData?.totalReward ?? 0
}, {
  months: 12,
  stakedAmount: ixtTwelveMonthData.value?.stakingItems[0]?.userStakingData?.amountStaked ?? 0,
  reward: ixtTwelveMonthData.value?.stakingItems[0]?.userStakingData?.totalReward ?? 0
}]

const activePeriod = ref<StakePeriod>(stakePeriods[0])

const selectPeriod = (active: StakePeriod) => {
  activePeriod.value = active
}

const formattedMonths = (months: number) => {
  if (months == 12)
    return "1 Year"

  return `${months} Month`
}


const { ixtToUSD } = useCurrencyConversion()
const { ixtBalance } = useCurrencyData()
const ixtBalanceRounded = computed(() => roundToDecimals(ixtBalance.value ?? 0, 2))
const usdBalanceRounded = computed(() => roundToDecimals(ixtToUSD(ixtBalance.value ?? 0), 2))

const projectedIxtBalanceRounded = computed(() => roundToDecimals(ixtBalanceRounded.value + ixtBalanceRounded.value * activePeriod.value.apy / 100, 2))

const projectedUsdBalanceRounded = computed(() => roundToDecimals(usdBalanceRounded.value + usdBalanceRounded.value * activePeriod.value.apy / 100, 2))

</script>