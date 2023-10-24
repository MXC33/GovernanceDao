<template lang="pug">
VList()
  div(text="ellipsis") 
    span Connected to  
    span(font="bold" color="ix-mint") {{ walletAdress }}

  div(mt="3" color="white")
    div(v-if="loginStatus == 'logged-out'") {{$t(`general.wallet.playerProfile.notLoggedIn`)}}

    HList(v-else-if="loginStatus == 'connecting'" font="bold" items="center" space-x="2")
      HelperLoader()
      div {{$t(`general.wallet.playerProfile.playerConnecting`)}}...

    div(v-else-if="loginStatus == 'logged-in'" space-x="2" v-if="needsIXUser") 
      span {{$t(`general.wallet.playerProfile.loggedInAs`)}}
      span(color="ix-orange" font="bold") {{ user?.username }}
      
</template>

<script setup lang="ts">
import type { IXAppConfig } from '~/composables/useAppSetup';

const config = useAppConfig() as IXAppConfig
const needsIXUser = computed(() => !config.connectWithoutIXUser)
const { user } = useUser()
const { walletAdress } = useWallet()
const { loginStatus } = useLogin()
</script>