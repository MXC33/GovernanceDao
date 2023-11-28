import type { ExternalProvider } from "@ethersproject/providers";
//@ts-ignore
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import MetaMaskSDK from "@metamask/sdk"
import { DeFiWeb3Connector } from '@deficonnect/web3-connector'
import { useChainInfo } from "./useWallet";

type InjectedProviderFlags = {
  isBraveWallet?: true
  isCoinbaseWallet?: true
  isExodus?: true
  isFrame?: true
  isMetaMask?: true
  isOneInchAndroidWallet?: true
  isOneInchIOSWallet?: true
  isOpera?: true
  isTally?: true
  isTokenPocket?: true
  isTokenary?: true
  isTrust?: true
  isWombat?: true
  isBitKeep?: true // Has changed name to Bitget but still returns isBitKeep
}

type InjectedProvider = ExternalProvider & InjectedProviderFlags

const getProviderName = (provider: InjectedProvider) => {
  if (provider.isWombat) return 'Wombat'
  if (provider.isBitKeep) return 'Bitget'
  if (provider.isBraveWallet) return 'Brave Wallet'
  if (provider.isCoinbaseWallet) return 'Coinbase Wallet'
  if (provider.isExodus) return 'Exodus'
  if (provider.isFrame) return 'Frame'
  if (provider.isOpera) return 'Opera'
  if (provider.isTally) return 'Tally'
  if (provider.isTokenPocket) return 'TokenPocket'
  if (provider.isTokenary) return 'Tokenary'
  if (provider.isTrust) return 'Trust Wallet'
  if (provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet)
    return '1inch Wallet'

  // Default to metamask
  return 'MetaMask'

}
const createDefiProvider = async () => {
  const { chainIdsRPCmap, chainIds } = useChainInfo()
  const connector = new DeFiWeb3Connector({
    supportedChainIds: Object.values(chainIds),
    appName: 'Planet IX',
    chainType: 'eth',
    chainId: '137',
    rpcUrls: chainIdsRPCmap,
  })

  const walletProvider = await connector.activate()
  return walletProvider.provider
}

const createCoinbaseProvider = async () => {
  const app = useNuxtApp()
  const { rpcs } = useChainInfo()
  const coinbaseWallet = app.$coinbaseWallet

  //@ts-ignore
  const provider = coinbaseWallet.makeWeb3Provider(rpcs['polygon'], 137)

  try {
    await provider.enable()
  } catch {
    return null
  }
  return provider
}

const createMetamaskProvider = async () => {
  const sdk = new MetaMaskSDK({
    enableDebug: false,
    dappMetadata: {
      name: 'Mission Control',
      url: 'https://missioncontrol.planetix.com/IX-icon.png'
    }
  })
  await sdk.init()

  await sdk.connect()
  return sdk.getProvider()
}


const createWalletConnectProvider = async () => {
  const { chainIds } = useChainInfo()

  try {
    const provider = await EthereumProvider.init({
      projectId: '861ef743dceed75deb813e6d390dc4a8',
      chains: [1, 137],
      showQrModal: true
    })

    await provider.enable()

    return provider
  } catch (error) {
    console.log("ERROR", error)
    return false
  }
}

export type WalletConnector = 'injected' | 'walletconnect' | 'coinbase' | 'metamask' | 'defi'

export const useConnectors = () => {
  const currentConnector = useCookieState<WalletConnector | null>('active-connector', () => null, { consentLevel: 'necessary' })

  const getInjectedProvider = () => {
    if (!process.client)
      return null

    //@ts-ignore
    return window.ethereum as InjectedProvider
  }

  const getAvailableConnectors = (): WalletConnector[] => {
    const injectedProvider = getInjectedProvider()
    const defaultProviders: WalletConnector[] = ['walletconnect', 'defi']

    if (injectedProvider?.isCoinbaseWallet)
      return ['coinbase', ...defaultProviders]

    if (!injectedProvider || (injectedProvider?.isMetaMask && !injectedProvider.isBraveWallet && !injectedProvider.isBitKeep && !injectedProvider.isWombat))
      return ['metamask', 'coinbase', ...defaultProviders]

    return ['injected', 'coinbase', ...defaultProviders]
  }

  const clearConnector = () => {
    currentConnector.value = null
  }

  const getConnectorName = (type: WalletConnector) => {
    const injectedProvider = getInjectedProvider()
    switch (type) {
      case 'injected':
        return injectedProvider && getProviderName(injectedProvider)
      case 'metamask':
        return 'Metamask'
      case 'coinbase':
        return 'Coinbase Wallet'
      case 'defi':
        return 'Crypto.com DeFi Wallet'
      case 'walletconnect':
        return 'Wallet Connect'
    }
  }

  const getConnector = async () => {
    if (!process.client || !currentConnector.value)
      return null

    const injectedProvider = getInjectedProvider()
    switch (currentConnector.value) {
      case 'coinbase':
        return await createCoinbaseProvider()

      case 'injected':
        if (injectedProvider?.isCoinbaseWallet)
          return createCoinbaseProvider()
        return injectedProvider

      case 'metamask':
        return await createMetamaskProvider()

      case 'defi':
        return await createDefiProvider()

      case 'walletconnect':
        return await createWalletConnectProvider()
    }
  }

  const setConnector = (connector: WalletConnector) => {
    currentConnector.value = connector
  }

  return {
    currentConnector,
    getAvailableConnectors,
    clearConnector,
    getConnectorName,
    setConnector,
    getConnector
  }
}
