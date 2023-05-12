<template lang="pug">
VList(bg="ix-primary opacity-20" b="2 ix-primary opacity-40" p="6" space-y="5" max-w="150" w="full" cut="bottom-right b-ix-primary b-opacity-60 lg")
  h2(text="2xl white" font="druk" @click="debugWalletClick") {{ $t('wallet.title') }}

  VList(text="white left")
    WalletStatus(v-if="isWalletConnected")
    VList(v-else space-y="3") 
      div {{ $t('wallet.welcomeMessage') }}
      div(v-if="!!walletError" color="mc-orange") 
        span(font="bold") {{$t(`general.errorConnecting`)}}
        span {{ walletError }}

  a(btn="~ lg secondary" href="https://planetix.com/connect" v-if="loginFailType == 'no-user'") Register on PlanetIX
  WalletButtonDisconnect(v-if="isWalletConnected")

  div(flex="~ col" space-y="3" v-else)
    WalletButtonConnect(v-for="connector in connectors" :connector="connector")

  ButtonSound(sound="lg" btn="~ white lg" cut="bottom-right" v-if="walletState == 'connecting' || walletState == 'signing'" @click="logoutWallet") {{$t(`general.cancel`)}}


</template>

<script setup lang="ts">
import type { WalletConnector } from '~/composables/Contract/useWalletConnectors'

const { getAvailableConnectors } = useConnectors()

const connectors = ref<WalletConnector[]>([])
const { isWalletConnected, walletError, walletState, logoutWallet } = useWallet()
const { loginFailType } = useLogin()
const config = useRuntimeConfig()

const isProduction = config.public.environment == 'production'

const beforeWindowUnload = () => {
  if (walletState.value == 'connecting' || walletState.value == 'signing')
    logoutWallet()
}

const setupConnectors = () => {
  connectors.value = getAvailableConnectors()
}

onBeforeMount(() => {
  setTimeout(setupConnectors, 3000)
  window.addEventListener('beforeunload', beforeWindowUnload)
  window.addEventListener('ethereum#initialized', setupConnectors, {
    once: true,
  });
})

onMounted(() => {
  setupConnectors()
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeWindowUnload)
  window.removeEventListener('ethereum#initialized', setupConnectors);
})

const debugWalletClick = (click: MouseEvent) => {
  if (isProduction)
    return
}

</script>