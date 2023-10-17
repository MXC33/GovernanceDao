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
  VList(space-y="6") 
    TableDashboard()
    div(grid="~ cols-2 gap-6")
      Card() 
        VList()
          div(text="subheading")
            div() Circulating Supply
            div(color="ix-orange") See on coinGecko
            div() 422,681

          div(text="detail")
            h4() Total pool next epoch

      Card()
        div(text="subheading")
          h3() Distribution today
          h4() 36,936.63 (ICON) 
</template>

<script lang="ts" setup>

</script>