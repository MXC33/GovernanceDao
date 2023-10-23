<template lang="pug">
div(grid="~ cols-2 gap-6")
  VList()
    VList(text="xl left" flex-grow="1")
      div(text="subheading") {{ $t("index.stakeIXTSection") }}

      h1(text="bold 5xl" color="#84D4BC") [api data]
      HList(gap-6)
        button(color="gray") {{ $t("index.buyIXTButton") }}
        button(color="gray") {{ $t("index.addToWalletButton") }}

    CardChart()

  VList(space-y="6" flex-grow="1") 
    HomepageDashboardTable()

    div(grid="~ cols-2 gap-6" flex-grow="1")
      Card() 
        VList()
          div(text="subheading")
            p {{$t("index.circulatingSupplySection") }}
            p(text="ix-orange") {{$t("index.CoingeckoLink") }}

            div() [api data]


      Card()
        div(text="subheading" space-y="8")
          p {{$t("index.distributionToday") }}

          HList(space-x="3")
            h4(text=" 2xl ") [api data]
            IXTIcon(w="5")
</template>

<script lang="ts" setup>
import IXTIcon from '~/assets/images/token.svg'
</script>