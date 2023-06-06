<template lang="pug">
div(bg="black" p="3" v-if="walletState == 'connected'")
  div(b="1 $mc-orange_40" p="2" text="center $mc-orange" grow="~" bg="$mc-orange_20" @click="logoutWallet") {{$t(`general.disconnect`)}} 

</template>

<script lang="ts" setup>
const { logoutWallet } = useWallet()
const { walletState } = useWallet()

const emit = defineEmits(['disconnect'])

const clikedLogout = () => {
  emit('disconnect')
  logoutWallet()
}
</script>