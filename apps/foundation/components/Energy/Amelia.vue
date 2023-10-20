<template lang="pug">
div(grid="~ cols-2 gap-3")
  Card()
    HList(space-x="10")
      div 
        div Locking period
        div(style="display: flex; align-items: center;")
          span 1 month
      div 
        div Your Stake
        div(style="display: flex; align-items: center;")
          span 0
          IXTIcon(w="5" class="ml-2")
      div 
        div Your Stake
        div(style="display: flex; align-items: center;")
          span 0
          img(src="~/assets/png/EnergyIcon.png" w="7" class="ml-2")
      div 
        div Daily rewards
        div(style="display: flex; align-items: center;")
          span 0
          IXTIcon(w="5" class="ml-2")
    HList(gap-6)
      button(btn="~ primary-outline disabled") Unstake 
      button(btn="~ primary-outline") Stake 
    template(#detailBottom)
      ClaimHorizontal()
      ClaimHorizontal()
  EnergyPoolEarn()
</template>

<script lang="ts" setup>

</script>