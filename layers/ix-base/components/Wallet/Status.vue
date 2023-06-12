<template lang="pug">
VList()
  div(text="ellipsis") 
    span Connected to  
    span(font="bold" color="ix-mint") {{ walletAdress }}

  div(mt="3" color="white")
    div(v-if="loginStatus == 'logged-out'") {{$t(`wallet.playerProfile.notLoggedIn`)}}

    HList(v-else-if="loginStatus == 'connecting'" font="bold" items="center" space-x="2")
      HelperLoader()
      div {{$t(`wallet.playerProfile.playerConnecting`)}}...

    div(v-else-if="loginStatus == 'logged-in'" space-x="2") 
      span {{$t(`wallet.playerProfile.loggedInAs`)}}
      span(color="ix-orange" font="bold") {{ user?.username }}
      
</template>

<script setup lang="ts">
const { user } = useUser()
const { walletAdress } = useWallet()
const { loginStatus } = useLogin()
</script>