<template lang="pug">
Card
  div
    div(text-2xl font-bold) 
      PageParagraphs(section="EnergyPool")
    div(color="ix-orange" flex gap-1)
      PageParagraphs(section="EpochEnds")
      p 17D 5H 18M
  div(grid="~ cols-3")
    div 
      div(text="detail")
        PageParagraphs(section="DailyIXT")
      div(style="display: flex; align-items: center;")
        span 0.002
        IXTIcon.icon(w="5" class="ml-2")
    div 
      div(text="detail") 
        PageParagraphs(section="TVL")
      div(style="display: flex; align-items: center;")
        span 123
        IXTIcon.icon(w="5" class="ml-2")
    div 
      div(text="detail") 
        PageParagraphs(section="IXTUnlocked")
      div(style="display: flex; align-items: center;")
        span 123
        IXTIcon.icon(w="5" class="ml-2")
    div 
      div(text="detail") 
        PageParagraphs(section="YourStake")
      div(style="display: flex; align-items: center;")
        span 123
        IXTIcon.icon(w="5" class="ml-2")
    div 
      div(text="detail") 
        PageParagraphs(section="ClaimableRewards")
      div(style="display: flex; align-items: center;")
        span 123
        IXTIcon.icon(w="5" class="ml-2")
  HList(gap-6)
  template(#detailBottom)
    button(btn="~ primary-outline") 
      PageParagraphs(section="ChooseYourPool")
</template>

<script lang="ts" setup>
import IXTIcon from "~/assets/images/token.svg"

</script>

<style></style>