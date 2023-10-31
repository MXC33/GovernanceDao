<template lang="pug">
div(grid="~ cols-2" gap-6)
  VList(gap-6)
    Card(flex-grow)
      CardTitle()
        template(#default) {{ $t(`ixtCatRaff.TreasuryBalance.title`) }}
        template(#detail) IXT
      TitleDetail(icon="ixt")
        template(#default) 480,000 
    Card()
      CardTitle()
        template(#default) {{ $t(`ixtCatRaff.PoolPrice.title`) }}
        template(#detail) {{ $t(`ixtCatRaff.PoolPrice.description`) }}
        template(#price) $ 51,134.943


  Card(flex-grow)
    CardTitle()
      template(#default) {{ $t(`ixtCatRaff.PoolStats.title`) }}
    div(bg="black" flex-grow style="display: flex; align-items: center; justify-content: space-between;")
      CardTitle(flex="~ row justify-between")
        div()
          TitleDetail(#detail) {{ $t(`ixtCatRaff.CurrentWeekDeposits.title`) }}
        div()
          span 0 IXT
          span ($0)
    HList(bg="black" flex-grow style="display: flex; align-items: center; justify-content: space-between;")
      CardTitle()
        TitleDetail(#detail) {{ $t(`ixtCatRaff.TotalWeekDeposits.title`) }}
        div 136779 IXT
</template>

<script lang="ts" setup>

</script>