<template lang="pug">
DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900" max-h="auto")
  template(#header)
    div Stake your IXT

  template(#default)
    DrawerContentBody(space-y="6" v-if="activePeriod")
      StakeIxtMyBalance()

      Divider(mx="-6")

      VList(space-y="3")
        PageSubTitle() Duration

        div(grid="~ cols-4 gap-3")
          button(btn="~ form on-active:form-active" v-for="period in stakePeriods" capitalize="~" :active="activePeriod.months == period.months" @click="selectPeriod(period)" flex="~ col") 
            div(font="bold") {{ formattedMonths(period?.months) }}
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
              GlitchText(:text="formattedMonths(activePeriod?.months)")

        PriceRow()
          template(#left): span(text="detail") APY
          template(#right)
            div(text="detail-value")
              GlitchText(:text="activePeriod?.apy + '%'")

      StakeIxtTotal(:projected-ixt="projectedIxtBalanceRounded" :projected-usd="projectedUsdBalanceRounded")

      Divider(mx="-6")

      PriceRow()
        template(#right)
          ButtonInteractive(:loading="isLoading" @click="onClickStake"  text="STAKE YOUR IXT NOW" min-w="60" cut="~ bottom-right sm")

</template>

<script lang="ts" setup>
import { type StakingDataFragment, StakingId } from '~/.nuxt/gql/default';
const { displaySnack } = useSnackNotifications()
const { formattedMonths } = useStakingHelper()

const { data: ixtOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { data: ixtThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { data: ixtSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { data: ixtTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)


interface StakePeriod {
  months: number
  apy: number,
}

const setupStakingPeriod = (stakingData: StakingDataFragment | null, month: number): StakePeriod | null => {
  if (!stakingData)
    return null
  return {
    months: month,
    //@ts-ignore
    apy: getAPY(stakingData?.stakingItems[0]?.rewardRate, stakingData?.totalStakedAmount)
  }
}


const stakePeriods = computed<StakePeriod[]>(() => [
  setupStakingPeriod(ixtOneMonthData.value, 1),
  setupStakingPeriod(ixtThreeMonthData.value, 3),
  setupStakingPeriod(ixtSixMonthData.value, 6),
  setupStakingPeriod(ixtTwelveMonthData.value, 12)
].filter(Boolean) as StakePeriod[])


const activePeriod = ref<StakePeriod>(stakePeriods.value[0])

watch(stakePeriods, (data) => {
  activePeriod.value = data[0]
})

const selectPeriod = (active: StakePeriod) => {
  activePeriod.value = active
}


const stakePeriodToStakingId = (period: StakePeriod) => {
  switch (period.months) {
    case 1:
      return StakingId.IxtOneMonth
    case 3:
      return StakingId.IxtThreeMonths
    case 6:
      return StakingId.IxtSixMonths
    case 12:
      return StakingId.IxtTwelveMonths
    default:
      return StakingId.IxtOneMonth
  }
}

const { loading: isLoading, execute: stakeIxtRequest } = useContractRequest(async () => {
  const response = await stakeIXT(stakePeriodToStakingId(activePeriod.value), ixtBalance.value)
  console.log("Got it", response)
  displaySnack("stake-success", "success")
})

const onClickStake = () => {
  return stakeIxtRequest()
}

const { ixtToUSD } = useCurrencyConversion()
const { ixtBalance } = useCurrencyData()
const ixtBalanceRounded = computed(() => roundToDecimals(ixtBalance.value ?? 0, 2))
const usdBalanceRounded = computed(() => roundToDecimals(ixtToUSD(ixtBalance.value ?? 0), 2))

const projectedIxtBalanceRounded = computed(() => roundToDecimals(ixtBalanceRounded.value + ixtBalanceRounded.value * activePeriod.value?.apy / 100, 2))

const projectedUsdBalanceRounded = computed(() => roundToDecimals(usdBalanceRounded.value + usdBalanceRounded.value * activePeriod.value?.apy / 100, 2))

</script>