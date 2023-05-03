<template lang="pug">
button(sound="lg" bg="mc-orange_10" btn="~ accent on-active:mint lg" color="white" p="x-3 y-3" @click="onClickConnect" w="full" text="white left" flex="~ row" space-x="4" tracking="0" justify="start" opacity="on-available:100 50" normal-case="~" pointer-events="on-available:auto none" :active="isActive(connector)" :available="isConnectorAvailable" cut="bottom-right") 
  component(:is="logo" w="10")
  span {{ connectorName ?? 'No injected wallet found' }}
</template>

<script setup lang="ts">
import MetamaskLogo from '~/assets/images/wallet/metamask.svg?component'
import WombatLogo from '~/assets/images/wallet/wombat.svg?component'
import BitKeepLogo from '~/assets/images/wallet/bitkeep.svg?component'
import CoinBaseLogo from '~/assets/images/wallet/coinbase.svg?component'

import WalletConnectLogo from '~/assets/images/ui/wallet/walletconnect.svg?component'
import type { WalletConnector } from '~~/composables/useWalletConnectors';

const { connector } = defineProps<{
  connector: WalletConnector
}>()

const logo = computed(() => {
  switch (name.value) {
    case 'MetaMask':
      return MetamaskLogo

    case 'Wombat':
      return WombatLogo

    case 'BitKeep':
      return BitKeepLogo

    case 'Coinbase Wallet':
      return CoinBaseLogo

    case 'Wallet Connect':
      return WalletConnectLogo

    default:
      return MetamaskLogo
  }
})

const name = computed(() => getConnectorName(connector))

const { loginUser } = useLogin()

const onClickConnect = () => {
  if (!isConnectorAvailable.value)
    return

  loginUser(connector)
}

const { getConnectorName, currentConnector } = useConnectors()

const { walletState } = useWallet()

const isConnectorAvailable = computed(() => getConnectorName(connector) != null)
const isActive = (connector: WalletConnector) => currentConnector.value == connector

const connectorName = computed(() => {
  if (isActive(connector) && walletState.value != 'disconnected')
    return `${name.value} (${walletState.value})`
  else
    return name.value
})
</script>