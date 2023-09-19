<template lang="pug">
HList(bg="black" p="3" v-if="walletState == 'connected'")
  ButtonSound(b="1 mc-orange opacity-40" p="2" color="mc-orange" grow="~" bg="mc-orange_10 hover:mc-orange_20" uppercase="~" font="bold" sound="md" @click="logoutWallet") disconnect
  //-{{$t(`general.disconnect`)}} 

</template>

<script lang="ts" setup>
const { logoutWallet } = useWallet()
const { walletState } = useWallet()
</script>