<!-- <template lang="pug">
div(bg="black" p="3" v-if="walletState == 'connected'")
  ButtonSound(sound="sm" btn="~ accent" w="full" @click="logoutWallet" capitalize="~")  {{$t(`general.disconnect`)}} 

</template>

<script lang="ts" setup>
const { logoutWallet } = useWallet()
const { walletState } = useWallet()
</script> -->

<template lang="pug">
div(bg="black" p="3" v-if="walletState == 'connected'")
  ButtonSound(sound="sm" b="1 ix-orange opacity-40" p="2" text="center ix-orange" grow="~" bg="ix-orange opacity-20" font="bold" w="full" @click="logoutWallet") {{$t(`general.disconnect`)}} 

</template>

<script lang="ts" setup>
const { logoutWallet } = useWallet()
const { walletState } = useWallet()
</script>