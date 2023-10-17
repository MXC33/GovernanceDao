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
              template(#right): span(text="detail-value") 2000 IXT

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
                span(text="subheading") 250 IXT
                span(text="detail") $200

</template>


<script lang="ts" setup>
interface StakePeriod {
  months: number
  apy: number
}
const stakePeriods: StakePeriod[] = [{
  months: 1,
  apy: 10.74
}, {
  months: 3,
  apy: 15.22
}, {
  months: 6,
  apy: 20.99
}, {
  months: 12,
  apy: 42.01
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

</script>