<template lang="pug">
div(grid="~ cols-2 gap-6")
  VList()
    PageSection(section="Staking" :primary="true")
      EnergyPoolCard()
  VList(grid="~" space-y="12" flex-direction-row) 
    CardChart()
    HList(gap="6")
      Card() 
        TitleDetail()
          div()
            PageParagraphs(section="IXTPoolNextEpoch")
          div(color="orange")
            PageParagraphs(section="Estimated")
          TitleDetail(#detail)
            div(text="xl")
              PageParagraphs(section="TotalPoolNextEpoch")
          div(flex) 422,681
            IXTIcon(w="6" class="ml-2")
      Card()
        TitleDetail()
          div()
            PageParagraphs(section="NextEpochRelease")
          div(color="orange") 
            PageParagraphs(section="facilitiesMinted")
          TitleDetail(#detail)
            div(text="xl") 99.94%
          div(flex) 422,431.531
            IXTIcon(w="6" class="ml-2")
</template>

<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'

</script>