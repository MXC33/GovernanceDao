<template lang="pug">
VList()
  div(text="mc-mint ellipsis") Connected to {{ walletAdress }}

  div(mt="3" color="white")
    div(v-if="loginStatus == 'logged-out'") {{$t(`wallet.playerProfile.notLoggedIn`)}}
    //- HelperLoaderSpinnerSmall(text="sm" v-else-if="loginStatus == 'connecting'")
      div {{$t(`wallet.playerProfile.playerConnecting`)}}...
    div(v-else-if="loginStatus == 'logged-in'" space-x="2") 
      span {{$t(`wallet.playerProfile.loggedInAs`)}}
      span(color="mc-orange" text-shadow="mc-orange") {{ user?.username }}
</template>

<script setup lang="ts">
const { user } = useUser()
const { walletAdress } = useWallet()
const { loginStatus } = useLogin()
</script>