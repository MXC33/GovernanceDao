
import * as Web3Token from "web3-token";
import { ethers } from "ethers";

export type Net = 'polygon' | 'ethereum'
export type Chain = 'goerli' | 'mumbai' | 'polygon' | 'ethereum'

export const useActiveChain = (chainNet: Net = 'polygon'): Chain => {
  const { CHAIN_NET } = useRuntimeConfig().public
  const isMainNet = CHAIN_NET == 'main'

  if (chainNet == 'polygon')
    return isMainNet ? 'polygon' : 'mumbai'
  else
    return isMainNet ? 'ethereum' : 'goerli'
}

type AccountAdress = string

export type WalletState = 'disconnected' | 'signing' | 'connecting' | 'connected'

export const useChainInfo = () => {
  const { INFURA_ID } = useRuntimeConfig().public
  const INFURA_RPC = `https://mainnet.infura.io/v3/${INFURA_ID}`

  const chainIds: Record<Chain, number> = {
    ethereum: 1,
    goerli: 5,
    polygon: 137,
    mumbai: 80001
  }

  const currency: Record<Chain, string> = {
    ethereum: "Eth",
    goerli: "Eth",
    polygon: "Matic",
    mumbai: "Matic"
  }

  const name: Record<Chain, string> = {
    ethereum: "Ethereum",
    goerli: "Goerli (Etherum Testnet)",
    polygon: "Polygon",
    mumbai: "Mumbai (Polygon Testnet)"
  }

  const rpcs: Record<Chain, string> = {
    ethereum: "https://ethereum.publicnode.com",
    goerli: "https://ethereum-goerli.publicnode.com",
    polygon: INFURA_RPC,
    mumbai: "https://polygon-mumbai-bor.publicnode.com"
  }

  const chainIdsRPCmap: Record<number, string> = Object.keys(rpcs).reduce((obj, chain) => {
    obj[chainIds[chain]] = rpcs[chain]
    return obj
  }, {})

  const getChainInfo = (chain: Chain) => ({
    chainId: chainIds[chain],
    chainHexId: `0x${Number(chainIds[chain]).toString(16)}`,
    chainName: name[chain],
    nativeCurrency: currency[chain],
    rpcUrl: rpcs[chain]
  })

  return {
    getChainInfo,
    chainIdsRPCmap,
    chainIds,
    rpcs
  }
}

export const useWallet = () => {
  const MAYBE_HARD_CODED_WALLET = null
  const { getConnector, clearConnector, currentConnector } = useConnectors()
  const { CHAIN_NET } = useRuntimeConfig().public
  const { getChainInfo } = useChainInfo()

  const ethereumChainAllowed = useState('wallet-ethereum-allowed', () => false)

  const provider = useState<ethers.providers.Web3Provider>('provider', () => null)

  const walletAdress = useCookieState<AccountAdress | null>('wallet-accounts', () => MAYBE_HARD_CODED_WALLET)

  const walletSigningToken = useCookieState<string | null>('web3Token', () => null, { consentLevel: 'necessary' })

  const walletError = useState<string | null>('wallet-error', () => null)

  const walletState = useState<WalletState>('wallet-state', () => 'disconnected')

  const isWalletConnected = computed(() =>
    walletAdress.value != null && walletSigningToken.value != null && provider.value != null
  )

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
    provider.value.on("network", (newNetwork, oldNetwork) => {
      if (ethereumChainAllowed.value)
        return

      // if (oldNetwork) {
      //   window.location.reload();
      // }
    });
  }

  const logoutWallet = () => {
    if (process.client) {
      localStorage?.removeItem('walletconnect');
    }
    setWalletAdress(null)
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
    new Promise((resolve, reject) => {
      provider.value.once(hash, (tx) => {
        resolve(tx)
      })
    })

  const ensureCorrectChain = async (isEthereum?: true) => {
    const currentChain = getChain(isEthereum ? 'ethereum' : 'polygon')
    const { chainId } = getChainInfo(currentChain)
    const network = provider.value.network

    if (network?.chainId != chainId)
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
      if (error.message)
        failedConnection(error.message)
      return false
    }
  }

  const setWalletAdress = (adress: string) => {
    if (!MAYBE_HARD_CODED_WALLET)
      walletAdress.value = adress
  }

  const getAccounts = async () => {
    try {
      return await provider.value.listAccounts()
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
        setWalletAdress(accounts[0])
      } else if (promptLogin) {
        const loginState = await showLogin()
        if (!loginState || loginState.length == 0)
          return false

        setWalletAdress(loginState[0])
      } else {
        failedConnection()
        return false
      }
    } catch (e: any) {
      failedConnection()
      return false
    }

    await ensureCorrectChain()

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
    const { chainId, chainName, nativeCurrency, rpcUrl, chainHexId } = getChainInfo(chain)

    try {
      await provider.value.send("wallet_switchEthereumChain", [{ chainId: chainHexId }])
    } catch (err) {
      // missing wallet in provider
      if (err && (err.code === 4902 || err.code === -32603)) {
        await provider.value.send("wallet_addEthereumChain", [{
          chainId,
          chainName,
          nativeCurrency,
          rpcUrls: [rpcUrl]
        }]);
      } else {
        throw new Error(err)
      }
    }

    return true
  }

  const signMessage = async (msg: string) => {
    const signer = provider.value.getSigner()
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
      return

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
    provider,
    walletError,
    isWalletConnected,
    walletAdress,
    walletState,
    walletSigningToken,
    changeNetworkChain,
    getChain,
    addSigningToken
  }
}