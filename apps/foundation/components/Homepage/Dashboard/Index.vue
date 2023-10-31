<template lang="pug">
div(grid="~ lg:cols-2 cols-1 gap-6")
  VList( space-y="6")
    VList(text="xl left" flex-grow="1")
      div(text="subheading") {{ $t("index.stakeIXTSection") }}

      h1(text="bold 5xl" color="#84D4BC") {{ apy }}%
      HList(gap-6)
        HList(space-x="1" @click="enableSwap")
          button(color="gray") {{ $t("index.buyIXTButton") }}
          LaunchIcon(w="5")
        HList(space-x="1" @click="addIXTToWallet")
          button(color="gray") {{ $t("index.addToWalletButton") }}
          LaunchIcon(w="5")

    CardChart()

  VList(space-y="6" flex-grow="1") 
    HomepageDashboardTable()

    Card() 
      CardTitle() 
        template(#default) {{$t("index.circulatingSupplySection") }}
        template(#subtitle)
          a(href="https://www.coingecko.com/en/coins/ix-token" color="ix-orange" ) {{$t("index.CoingeckoLink") }}

      VList(space-y="1")
        HList(text="detail" space-x="3")
          div(flex-grow="1" color="white") {{ Math.floor(circulatingSupply).toLocaleString() }}
          div() {{ totalSupply.toLocaleString() }}
        div(bg="ix-mint" :style="{width: percentageOfSupply + '%'}" h="1")
        div(text="detail") {{ percentageOfSupply }} %

HeaderLifiWidget(v-if="swapVisible" @close="swapVisible = false")

</template>

<script lang="ts" setup>
import LaunchIcon from '~/assets/images/launch-icon.svg'
const { enable: enableSwap, state: swapVisible } = useIXTSwapVisible()
const { addIXTToWallet } = useWallet()

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