<template lang="pug">
div(grid="~ lg:cols-2 cols-1 gap-6")
  VList()
    Card()
      template(#default)
        VList()
          div(text="2xl" font="bold") {{$t("energy.EnergyPool.title") }}
          div(text="ix-orange")  {{$t("energy.EpochEnds.title") }} 
        EnergyDashboardMetadata()

      template(#detailBottom)
        ButtonGlitch(btn="~ primary-outline" cut="~ bottom-right b-ix-primary" @click="$emit('withdraw')" :text="$t('energy.ChooseStakingPool')")

  VList(grid="~" space-y="12" flex-direction-row) 
    CardChart()
    HList(gap="6")
      Card() 
        TitleDetail()
          div()
            p(text="subheading") {{$t("energy.IXTPoolNextEpoch.title") }}
            p(color="ix-orange" ) {{$t("energy.Estimated.title") }}
          div()
            p(text="detail") {{$t("energy.TotalPoolNextEpoch.title") }}
          div(flex) 422,681
            IXTIcon(w="6" class="ml-2")
      Card()
        TitleDetail()
          div()
            p(text="subheading") {{$t("energy.NextEpochRelease.title") }}
            p(color="ix-orange" ) {{$t("energy.facilitiesMinted.title") }}
          div(text="detail") 99.94%

          div(flex) 422,681
            IXTIcon(w="6" class="ml-2")
</template>
  
<script lang="ts" setup>

import IXTIcon from '~/assets/images/token.svg'

</script>