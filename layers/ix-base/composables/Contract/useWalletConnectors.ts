import type { ExternalProvider } from "@ethersproject/providers";
import type { MetaMaskSDKOptions } from "@metamask/sdk";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

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
  isBitKeep?: true
}

type InjectedProvider = ExternalProvider & InjectedProviderFlags

const getProviderName = (provider: InjectedProvider) => {
  if (provider.isWombat) return 'Wombat'
  if (provider.isBitKeep) return 'BitKeep'
  if (provider.isBraveWallet) return 'Brave Wallet'
  if (provider.isCoinbaseWallet) return 'Coinbase Wallet'
  if (provider.isMetaMask) return 'MetaMask'
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

const getInfuraRPC = () => {
  const { INFURA_ID } = useRuntimeConfig().public
  return `https://mainnet.infura.io/v3/${INFURA_ID}`
}

const createMetaMaskProvider = async () => {
  const { MetaMaskSDK } = await import('@metamask/sdk')
  const options: MetaMaskSDKOptions = {
    dappMetadata: {
      name: 'Mission Control',
      url: 'https://missioncontrol.planetix.com/IX-icon.png'
    }
  }
  const sdk = new MetaMaskSDK(options)

  const provider = sdk.getProvider()
  if (provider == undefined) { return }
  try {
    await provider.request({ method: 'eth_requestAccounts' })
    await provider.request({ method: 'eth_chainId' })
    return provider
  } catch (error) {
    console.error('Error connecting to Ethereum accounts:', error)
    return null
  }
}

const createCoinbaseProvider = async () => {
  const { CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk')

  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: 'Mission Control',
    appLogoUrl: 'https://missioncontrol.planetix.com/IX-icon.png',
    darkMode: true
  })

  console.log("PROVIDER", coinbaseWallet)

  const provider = coinbaseWallet.makeWeb3Provider(getInfuraRPC(), 137)

  try {
    await provider.enable()
  } catch {
    return null
  }
  console.log('test5', provider)

  return provider
}


const createWalletConnectProvider = async () => {
  //@ts-ignore
  const provider = await EthereumProvider.init({
    projectId: '861ef743dceed75deb813e6d390dc4a8',
    chains: Object.values(CHAIN_NET_ADDRESS)
  });


  try {
    await provider.enable()
  } catch {
    return null
  }
  return provider
}

export type WalletConnector = 'injected' | 'walletconnect' | 'coinbase' | 'metamask'

export const useConnectors = () => {
  const currentConnector = useCookieState<WalletConnector | null>('active-connector', () => null)

  const getInjectedProvider = () => {
    if (!process.client)
      return null

    //@ts-ignore
    return window.ethereum as InjectedProvider
  }

  const getAvailableConnectors = (): WalletConnector[] => {
    const injectedProvider = getInjectedProvider()

    if (injectedProvider?.isCoinbaseWallet)
      return ['metamask', 'coinbase', 'walletconnect']
    else
      return ['metamask', 'coinbase', 'walletconnect']
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
        return 'MetaMask'
      case 'coinbase':
        return 'Coinbase Wallet'
      case 'walletconnect':
        return 'Wallet Connect'
    }
  }

  const getConnector = async () => {
    const injectedProvider = getInjectedProvider()
    switch (currentConnector.value) {
      case 'metamask':
        if (process.client) {
          const mm = await createMetaMaskProvider()
          return mm
        }
      case 'coinbase':
        if (process.client) {
          const provider = await createCoinbaseProvider()
          return provider
        }

      case 'injected':
        if (injectedProvider?.isCoinbaseWallet && process.client)
          return createCoinbaseProvider()
        return injectedProvider

      case 'walletconnect':
        const wc = await createWalletConnectProvider()
        return wc
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
