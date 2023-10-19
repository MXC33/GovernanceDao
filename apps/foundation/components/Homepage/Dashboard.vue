<template lang="pug">
div(grid="~ cols-2 gap-6")
  VList(gap-47)
    VList(text="xl left")
      h3(color="gray") Stake IXT, earn up to
      h1(text="bold 5xl" color="#84D4BC") 18,88% APY
      HList(gap-6)
        button(color="gray") Buy IXT 
        button(color="gray") Add IXT to wallet 
    CardChart()
  VList(space-y="6" flex-grow="1") 
    TableDashboard()
    div(grid="~ cols-2 gap-6" flex-grow="1")
      Card() 
        VList()
          div(text="subheading")
            PageParagraphs(section="circulatingSupplySection")
            PageParagraphs(section="CoingeckoLink")
            div() 422,681

          div(text="detail")
            h4() Total pool next epoch

      Card()
        div(text="subheading" space-y=8)
          h3() Distribution today
          h4() 36,936.63 (ICON)
          //  IXTIcon(w="5")
</template>

<script lang="ts" setup>
import IXTIcon from '~/assets/images/token.svg'
</script>