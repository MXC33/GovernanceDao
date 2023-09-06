<template lang="pug">
div(bg="black" p="3" v-if="walletState == 'connected'")
  div(b="1 ix-orange opacity-40" p="2" text="center ix-orange" grow="~" bg="ix-orange opacity-20" font="bold" @click="logoutWallet" class="pink-btn") {{$t(`general.disconnect`)}}

</template>

<script lang="ts" setup>
const { logoutWallet } = useWallet()
const { walletState } = useWallet()
</script>
