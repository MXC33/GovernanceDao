<tempalte lang="pug">
button(p="2"  whitespace="nowrap")
  Transition(name="fade-slow" mode="out-in")
    span(v-if="walletState == 'disconnected'") {{ $t(`general.navigation.menu.connectWallet`)}}

    span(v-else-if="ixtBalance != undefined" w="25" text="ix-mint") {{ roundToDecimals(ixtBalance, 2) }} IXT

    HelperLoader(v-else fill="ix-mint on-wallet:ix-orange" w="4" :wallet="walletState != 'connected'")
<template>


<script lang="ts">
const { walletState } = useWallet()
const { ixtBalance, ixtPending } = useIXTContract()
</script>

