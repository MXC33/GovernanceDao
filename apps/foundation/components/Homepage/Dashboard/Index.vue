<template lang="pug">
div(grid="~ cols-2 gap-6")
  VList(gap-47)
    VList(text="xl left")
      div(text="subheading")
        PageParagraphs(section="stakeIXTSection")
      h1(text="bold 5xl" color="#84D4BC") [api data]
      HList(gap-6)
        button(color="gray") 
          PageParagraphs(section="buyIXTButton")
        button(color="gray")
          PageParagraphs(section="addToWalletButton")
    CardChart()
  VList(space-y="6" flex-grow="1") 
    HomepageDashboardTable()
    div(grid="~ cols-2 gap-6" flex-grow="1")
      Card() 
        VList()
          div(text="subheading")
            PageParagraphs(section="circulatingSupplySection")
            PageParagraphs(text="ix-orange" section="CoingeckoLink")
            div() [api data]


      Card()
        div(text="subheading" space-y=8)
          PageParagraphs(section="distributionToday")
          h4(text=" 2xl ") [api data]
            IXTIcon(w="5")
</template>

<script lang="ts" setup>


import IXTIcon from '~/assets/images/token.svg'
</script>