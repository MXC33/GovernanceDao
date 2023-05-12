<template lang="pug">
ButtonSound(sound="lg" btn="~ accent lg" color="white" text-shadow="none" @click="logoutWallet" cut="bottom-right") {{$t(`general.disconnect`)}}
</template>

<script setup lang="ts">
const { logoutWallet } = useWallet()
</script>