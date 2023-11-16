<template lang="pug">
#app.antialiased(flex="~ col grow" font="bdr" color="white")
  NuxtLayout()
    NuxtLoadingIndicator(color="rgb(255, 102, 71)")

    NuxtPage()
    //- Auth(v-else)

</template>

<script setup lang="ts">

const { setupOnMounted } = useAppSetup()
const { changeNetworkChain } = useWallet()

useHead({
  title: "Lucky Cat - $MILK",
  script: [
    'global.js'
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})

onMounted(async () => {
  // console.log("CHANGE CHAIN")
  // await changeNetworkChain("ethereum")
})

</script>

<style>
.v-btn {
  letter-spacing: 0 !important;
  text-transform: none;
}

.v-btn--size-x-large {
  font-weight: bold;
}

html,
body {
  scroll-behavior: smooth;
}
</style>
