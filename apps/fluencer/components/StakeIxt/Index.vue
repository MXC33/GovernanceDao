<template lang="pug">
DrawerContent(:start-open="true" :is-neutral="true" bg="gray-900" max-h="auto")
  template(#header)
    div Stake your IXT

  template(#default)
    DrawerContentBody(space-y="6" v-if="activePeriod")
      StakeIxtMyBalance()

      Divider(mx="-6")

      VList(space-y="3")
        PageSubTitle() IXT Amount

        div(grid="~ md:cols-4 gap-3")
          Adjustable(v-model="ixtAmount" frame="~")

          ButtonAnimated(btn="~ form on-active:form-active" h="12" v-for="amount in ixtPreAmount" capitalize="~" :active="percentageActive(amount)" @click="selectIXT(amount)" flex="~ col" justify="center") 
            div(font="bold") {{ amount }}%

        PageSubTitle() Duration

        div(grid="~ md:cols-4 gap-3")
          ButtonAnimated(btn="~ form on-active:form-active" h="12" v-for="period in stakePeriods" capitalize="~" :active="activePeriod.months == period.months" @click="selectPeriod(period)" flex="~ col" justify="center") 
            div(font="bold") {{ formattedMonths(period?.months) }}
            div(text="detail" leading="1em") {{ period.apy }}% APY

      Divider(mx="-6")

      VList()
        PriceRow()
          template(#left): span(text="detail") Quantity
          template(#right): span(text="detail-value") {{ixtBalanceRounded}} IXT

        PriceRow()
          template(#left): span(text="detail") Staking period
          template(#right)
            div(text="detail-value" whitespace="nowrap")
              GlitchText(:text="formattedMonths(activePeriod?.months)")

        PriceRow()
          template(#left): span(text="detail") APY
          template(#right)
            div(text="detail-value" whitespace="nowrap")
              GlitchText(:text="activePeriod?.apy + '%'")

      StakeIxtTotal(:projected-ixt="projectedIxtBalanceRounded" :projected-usd="projectedUsdBalanceRounded")

      Divider(mx="-6")

      HList(self="end" w="lt-md:full")
        ButtonInteractive(:loading="isLoading" :invalid="ixtAmount?.value == 0" @click="stakeIxtRequest"  text="STAKE YOUR IXT NOW" min-w="60" cut="md:~ bottom-right sm b-ix-primary" w="lt-md:full")

</template>

<script lang="ts" setup>
import type { AdjustableToken } from '@ix/base/composables/Utils/useAdjustableNumber';
import { type StakingDataFragment, StakingId } from '~/.nuxt/gql/default';
const { displaySnack } = useSnackNotifications()
const { ixtToken } = useCurrencyData()

const { data: ixtOneMonthData } = useStakingData(StakingId.IxtOneMonth)
const { data: ixtThreeMonthData } = useStakingData(StakingId.IxtThreeMonths)
const { data: ixtSixMonthData } = useStakingData(StakingId.IxtSixMonths)
const { data: ixtTwelveMonthData } = useStakingData(StakingId.IxtTwelveMonths)


const ixtPreAmount = [50, 100]
const ixtAmount = ref<AdjustableToken>()

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

const selectIXT = (percentage: number) => {
  if (ixtAmount.value)
    ixtAmount.value.value = Math.floor((ixtToken.value?.balance ?? 0) * (percentage / 100))
}

const percentageActive = (percentage: number) => {
  const amount = percentage / 100
  return ixtAmount.value?.value == Math.floor(amount * (ixtToken.value?.balance ?? 0))
}

watch(stakePeriods, (data) => {
  activePeriod.value = data[0]
})

watch(ixtToken, (token) => {
  if (token)
    ixtAmount.value = addAdjustableToToken(token, {
      payment: {
        paymentMethod: 'ixt',
        price: 1
      }
    })
}, { immediate: true })

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
  return onClickStake()
})

const onClickStake = async () => {
  const stakeAmount = ixtAmount.value?.value
  if (!stakeAmount)
    return
  const stakedIXT = await stakeIXT(stakePeriodToStakingId(activePeriod.value), stakeAmount)
  if (stakedIXT)
    displaySnack("ixt-stake-success", "success")
}

const { ixtToUSD } = useCurrencyConversion()
const ixtBalanceRounded = computed(() => roundToDecimals(ixtAmount.value?.value ?? 0, 2))
const usdBalanceRounded = computed(() => roundToDecimals(ixtToUSD(ixtAmount.value?.value ?? 0), 2))

const projectedIxtBalanceRounded = computed(() => {
  const factor = 12 / activePeriod.value?.months
  return roundToDecimals(ixtBalanceRounded.value + ixtBalanceRounded.value * activePeriod.value?.apy / 100 / factor, 2)
})

const projectedUsdBalanceRounded = computed(() => {
  const factor = 12 / activePeriod.value?.months
  return roundToDecimals(usdBalanceRounded.value + usdBalanceRounded.value * activePeriod.value?.apy / 100 / factor, 2)
})


</script>