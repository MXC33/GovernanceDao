<template lang="pug">
div(bg="black" p="3" v-if="walletState == 'connected'")
  ButtonSound(sound="sm" btn="~ accent" w="full" @click="logoutWallet" capitalize="~")  {{$t(`general.disconnect`)}} 

</template>

<script lang="ts" setup>
const { logoutWallet } = useWallet()
const { walletState } = useWallet()
</script>