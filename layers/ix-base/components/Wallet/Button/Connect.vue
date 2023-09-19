<template lang="pug">
ButtonSound(sound="lg" btn="~ tertriary on-active:active lg" color="white" p="3" @click="onClickConnect" w="full" flex="~ row" space-x="4" justify="start" normal-case="~" disable="on-available:active" :active="isActive(connector)" :unavailable="!isConnectorAvailable" ) 
  component(:is="logo" w="10")

  span {{ connectorName ?? 'No injected wallet found' }}
</template>

<script setup lang="ts">
import type { WalletConnector } from '~/composables/Contract/useWalletConnectors'

const MetamaskLogo = await import('../../../assets/images/wallet/metamask.svg')
const WombatLogo = await import('../../../assets/images/wallet/wombat.svg')
const BitKeepLogo = await import('../../../assets/images/wallet/bitkeep.svg')
const CoinBaseLogo = await import('../../../assets/images/wallet/coinbase.svg')
const WalletConnectLogo = await import('../../../assets/images/wallet/walletconnect.svg')
const CryptoDefiLogo = await import('../../../assets/images/wallet/crypto-defi.svg')


const props = defineProps<{
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

    case 'Crypto.com DeFi Wallet':
      return CryptoDefiLogo

    default:
      return MetamaskLogo
  }
})

const name = computed(() => getConnectorName(props.connector))

const { loginUser } = useLogin()

const onClickConnect = () => {
  if (!isConnectorAvailable.value)
    return

  loginUser(props.connector)
}

const { getConnectorName, currentConnector } = useConnectors()

const { walletState } = useWallet()

const isConnectorAvailable = computed(() => getConnectorName(props.connector) != null)
const isActive = (connector: WalletConnector) => currentConnector.value == connector

const connectorName = computed(() => {
  if (isActive(props.connector) && walletState.value != 'disconnected')
    return `${name.value} (${walletState.value})`
  else
    return name.value
})

</script>