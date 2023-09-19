<template lang="pug">
ButtonSound(sound="lg" btn="~ secondary lg" color="white" text-shadow="none" @click="logoutWallet" cut="bottom-right s-md") {{$t(`general.disconnect`)}}
</template>

<script setup lang="ts">
const { logoutWallet } = useWallet()
</script>