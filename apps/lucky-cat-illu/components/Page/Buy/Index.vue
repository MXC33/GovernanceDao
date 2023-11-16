<template lang="pug">
PageWrapper(page="buy")
  PageWrapperContent(space-y="12" justify="center" )
    h3(text="4xl pink" font="bdra") {{ $t('buy.header') }}

    PageBuyTokenCopy()

    div(grid="~ lg:cols-2 gap-16")
      PageBuyUniswap()
      PageBuyLifi()


</template>

<script lang="ts" setup>
</script>
