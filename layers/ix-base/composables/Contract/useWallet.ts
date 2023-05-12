
import * as Web3Token from "web3-token";
import { ethers } from "ethers";

export type Net = 'polygon' | 'ethereum'
export type Chain = 'goerli' | 'mumbai' | 'polygon' | 'ethereum'

export const CHAIN_NET_ADDRESS: Record<Chain, number> = {
  ethereum: 1,
  goerli: 5,
  polygon: 137,
  mumbai: 80001
}

export const useActiveChain = (chainNet: Net = 'polygon'): Chain => {
  const { CHAIN_NET } = useRuntimeConfig().public
  const isMainNet = CHAIN_NET == 'main'

  if (chainNet == 'polygon')
    return isMainNet ? 'polygon' : 'mumbai'
  else
    return isMainNet ? 'ethereum' : 'goerli'
}


export type WalletState = 'disconnected' | 'signing' | 'connecting' | 'connected'

export const useWallet = () => {
  const { getConnector, clearConnector, currentConnector } = useConnectors()
  const { CHAIN_NET } = useRuntimeConfig().public

  const ethereumChainAllowed = useState('wallet-ethereum-allowed', () => false)

  const provider = useState<ethers.providers.Web3Provider | null>('provider', () => null)

  const walletAdress = useCookieState<string | null>('wallet-accounts', () => null)
  const walletSigningToken = useCookieState<string | null>('wallet-token', () => null)

  const walletError = useState<string | null>('wallet-error', () => null)
  const walletState = useState<WalletState>('wallet-state', () => 'disconnected')

  const isWalletConnected = computed(() => walletAdress.value != null && walletSigningToken.value != null)

  const setupProvider = async () => {
    const connector = await getConnector()

    if (!connector) {
      return logoutWallet()
    }

    try {
      const web3Provider = new ethers.providers.Web3Provider(connector, "any")

      provider.value = markRaw(web3Provider)
      listenToProvider()
    } catch (error) {
      failedConnection('Error connecting to provider, browser not supported')
    }
    return true
  }

  const listenToProvider = () => {
    provider.value?.on("network", (newNetwork, oldNetwork) => {
      if (ethereumChainAllowed.value)
        return
    })
  }

  const logoutWallet = () => {
    if (process.client) {
      localStorage?.removeItem('walletconnect');
    }

    walletAdress.value = null
    walletSigningToken.value = null
    walletState.value = 'disconnected'
    clearConnector()
    return true
  }

  const logoutAndReload = () => {
    logoutWallet()
    window.location.reload()
  }

  const confirmWalletConnection = async (): Promise<boolean> => {
    const { showLogin } = useWallet()

    const isConnected = await showLogin()

    if (isConnected)
      return true

    logoutAndReload()
    return false
  }

  const onTransactionResolved = (hash: string) =>
    new Promise((resolve) => {
      provider.value?.once(hash, (tx) => {
        resolve(tx)
      })
    })

  const ensureCorrectChain = async (isEthereum?: true) => {
    const currentChain = getChain(isEthereum ? 'ethereum' : 'polygon')
    const network = await provider.value?.getNetwork()

    if (network?.chainId != CHAIN_NET_ADDRESS[currentChain])
      await changeNetworkChain(currentChain)
  }

  const failedConnection = (message?: string) => {
    logoutWallet()

    if (!message)
      return

    walletError.value = message
    console.log("[WEB3] Wallet connect failed", message)
  }

  const showLogin = async () => {
    if (!provider.value) {
      failedConnection('No provider found')
      return false
    }

    try {
      switch (currentConnector.value) {
        case 'walletconnect':
          return await provider.value.listAccounts()
        default:
          return await provider.value.send('eth_requestAccounts', [])
      }
    } catch (error) {
      console.error("FAILED LOGIN", error)
      if (error?.message)
        failedConnection(error?.message)
      return false
    }
  }

  const getAccounts = async () => {
    try {
      const accounts = await provider.value?.listAccounts()
      return accounts ?? []
    } catch (error) {
      return []
    }
  }

  const connectWallet = async (promptLogin: boolean = true): Promise<boolean> => {
    walletState.value = 'connecting'
    walletError.value = null

    try {
      await setupProvider()
    } catch (error) {
      console.log("Provider error", error.message)
    }

    if (!provider.value) {
      return false
    }

    try {
      const accounts = await getAccounts()

      if (accounts?.length > 0) {
        walletAdress.value = accounts[0]
      } else if (promptLogin) {
        const loginState = await showLogin()
        if (!loginState || loginState.length == 0)
          return false

        walletAdress.value = loginState[0]
      } else {
        failedConnection()
        return false
      }
    } catch (e: any) {
      failedConnection()
      return false
    }

    const network = await provider.value.getNetwork()

    const currentChain = getChain('polygon')

    if (network.chainId != CHAIN_NET_ADDRESS[currentChain])
      await changeNetworkChain(currentChain)

    walletState.value = 'signing'
    return true
  }

  const getChain = (network: 'polygon' | 'ethereum'): Chain => {
    const isPolygon = network == 'polygon'
    if (CHAIN_NET == 'main')
      return isPolygon ? 'polygon' : 'ethereum'
    else
      return isPolygon ? 'mumbai' : 'goerli'
  }

  const changeNetworkChain = async (chain: Chain) => {
    const address = CHAIN_NET_ADDRESS[chain]

    await provider.value?.send("wallet_switchEthereumChain", [{
      chainId: `0x${Number(address).toString(16)}`
    }])

    return true
  }

  const signMessage = async (msg: string) => {
    const signer = provider.value?.getSigner()
    if (!signer)
      throw new Error("No signer")

    const message = await signer.signMessage(msg)

    if (!message)
      throw new Error("User rejected the request")

    return message
  }

  const onWalletSigned = (token: string) => {
    walletSigningToken.value = token
    walletState.value = 'connected'
    return true
  }

  const addSigningToken = async (): Promise<boolean> => {
    if (!provider.value)
      return false

    try {
      const token = await Web3Token.sign(signMessage, {
        domain: 'missioncontrol.planetix.com',
        expires_in: "1d"
      })
      return onWalletSigned(token)

    } catch (error) {
      if (error.message)
        failedConnection(error.message)
      return false
    }
  }


  const contractSenderSameAsUser = (adress?: string) => {
    if (!walletAdress.value || !adress)
      return false

    return walletAdress.value.toUpperCase() == adress.toUpperCase()

  }

  return {
    connectWallet,
    logoutWallet,
    failedConnection,
    contractSenderSameAsUser,
    showLogin,
    logoutAndReload,
    onTransactionResolved,
    confirmWalletConnection,
    ensureCorrectChain,
    changeNetworkChain,
    getChain,
    addSigningToken,
    provider,
    walletError,
    isWalletConnected,
    walletAdress,
    walletState,
    walletSigningToken,
  }
}