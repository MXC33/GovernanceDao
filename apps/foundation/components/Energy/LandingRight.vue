<template lang="pug">
VList(grid="~" space-y="12" flex-direction-row) 
  CardChart()
  HList(gap="6")
    Card() 
      TitleDetail()
        h3() IXT Pool next epoch
        h4(color="orange") Estimated
        TitleDetail(#detail)
          h4(text="xl") Total pool next epoch 
        h4() 422,681
          // IXTIcon(w="6")
    Card()
      TitleDetail()
        h3() Next epoch release
        h4(color="orange") Based on facilities minted
        TitleDetail(#detail)
          h4(text="xl") 99.94%
        h4() 422,431.531
          // IXTIcon(w="6")

</template>

<script lang="ts" setup>

</script>