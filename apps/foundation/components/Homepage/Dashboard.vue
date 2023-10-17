<template lang="pug">
div(grid="~ cols-2 gap-6")
  VList(gap-50)
    VList(text="xl left")
      h3(color="gray") Stake IXT, earn up to
      h1(text="bold 5xl" color="#84D4BC") 18,88% APY
      HList(gap-6)
        button(color="gray") Buy IXT 
        button(color="gray") Add IXT to wallet 
    CardChart()
  VList(space-y="15") 
    TableDashboard()
    div(grid="~ cols-2 gap-6")
      Card() 
        TitleDetail(flex-col-reverse)
          h3() Circulating Supply
          h4(color="orange") See on coinGecko
          template(#detail)
            h4() Total pool next epoch
          h4() 422,681
      Card()
        TitleDetail(flex-col-reverse)
          h3() Distribution today
          h4() 36,936.63 (ICON) 
</template>

<script lang="ts" setup>

</script>