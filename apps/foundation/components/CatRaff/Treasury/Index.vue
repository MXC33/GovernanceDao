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

  //höger
  VList()
    Card()
      CardTitle()
        template(#default) {{ $t(`ixtCatRaff.PoolStats.title`) }}
      CardDetail()
        CardTitle()
          template(#default) 0 IXT
          template(#detail) {{ $t(`ixtCatRaff.CurrentWeekDeposits.title`) }}
      CardDetail()
        CardTitle()
          template(#detail) {{ $t(`ixtCatRaff.TotalWeekDeposits.title`) }}

</template>

<script lang="ts" setup>

</script>