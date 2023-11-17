<template lang="pug">
PageWrapper(page="buy")
  PageWrapperContent(space-y="12" justify="center" )
    h3(text="4xl pink" font="bdra") {{ $t('buy.header') }}

    PageBuyTokenCopy()

    div(grid="~ lg:cols-2 gap-16" p="t-16")
      div()
        h3(text="2xl pink center" font="bdra" m="b-4") {{ $t('buy.titleSwap') }}
        PageBuyUniswap()
      div()
        h3(text="2xl pink center" font="bdra" m="b-4") {{ $t('buy.titleBridge') }}
        PageBuyLifi()


</template>

<script lang="ts" setup>
</script>
