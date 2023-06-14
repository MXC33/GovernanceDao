
import type { ExternalProvider } from "@ethersproject/providers";
//@ts-ignore
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
  
  const MetaMaskSDK = require('@metamask/sdk');
  const sdk = new MetaMaskSDK({
    shouldShimWeb3: false,
    showQRCode: true,
  });
  const ethereum = sdk.getProvider(); 

  ethereum.request({ method: 'eth_requestAccounts', params: [] });

  return ethereum;
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

    return window.ethereum as InjectedProvider
  }

  const getAvailableConnectors = (): WalletConnector[] => {
    const injectedProvider = getInjectedProvider()

    if (injectedProvider?.isCoinbaseWallet)
      return ['coinbase', 'walletconnect']
    else
      return ['injected', 'coinbase', 'walletconnect']
  }

  const clearConnector = () => {
    currentConnector.value = null
  }

  const getConnectorName = (type: WalletConnector) => {
    const injectedProvider = getInjectedProvider()
    switch (type) {
      case 'injected':
        return injectedProvider && getProviderName(injectedProvider)
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
          const provider = await createMetaMaskProvider()
          return provider
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
