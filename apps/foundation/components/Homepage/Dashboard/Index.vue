<template lang="pug">
div(grid="~ cols-2 gap-6")
  VList()
    VList(text="xl left" flex-grow="1")
      div(text="subheading") {{ $t("index.stakeIXTSection") }}

      h1(text="bold 5xl" color="#84D4BC") {{ apy }}%
      HList(gap-6)
        button(color="gray") {{ $t("index.buyIXTButton") }}
        button(color="gray") {{ $t("index.addToWalletButton") }}

    CardChart()

  VList(space-y="6" flex-grow="1") 
    HomepageDashboardTable()

    Card() 
      VList(space-y="3")
        div()
          p(text="subheading") {{$t("index.circulatingSupplySection") }}
          a(href="https://www.coingecko.com/en/coins/ix-token" color="ix-orange" ) {{$t("index.CoingeckoLink") }}

        VList(space-y="1")
          HList(text="detail" space-x="3")
            div(flex-grow="1" color="white") {{ Math.floor(circulatingSupply).toLocaleString() }}
            div() {{ totalSupply.toLocaleString() }}
          div(bg="ix-mint" :style="{width: percentageOfSupply + '%'}" h="1")
          div(text="detail") {{ percentageOfSupply }} %

</template>

<script lang="ts" setup>
import IXTIcon from '~/assets/images/token.svg'

const { getCirculatingSupply, getTotalSupply, getAPY, ixtPoolData } = useStakingPools()

const circulatingSupply = await getCirculatingSupply()
const totalSupply = await getTotalSupply()

const percentageOfSupply = computed(() =>
  roundToDecimals(circulatingSupply / totalSupply * 100)
)

const apy = computed(() => {
  const twelveMonthData = ixtPoolData.value.find(item => item.month == 12)?.data
  if (!twelveMonthData)
    return 0
  return getAPY(twelveMonthData)
})

</script>