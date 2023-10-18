import { AppConfigInput } from "nuxt/schema"

export interface IXAppConfig extends AppConfigInput {
  ixApp: string,
  connectWithoutIXUser?: boolean
}

export const useAppSetup = () => {
  const globalY = useGlobalWindowScroll()
  const appLoaded = useState('app-fully-loaded', () => false)

  const { y } = useWindowScroll()
  const { connectWallet, walletState, walletSigningToken, walletAdress } = useWallet()
  const { setupCurrencyPrice } = useCurrencyConversion()
  const { setRefreshToken, isLoggedInAndConnected } = useLogin()
  const { user } = useUser()
  const { refresh: fetchCurrencyData } = useCurrencyData()
  const { execute: fetchMessageData } = useNeMessages()
  const { execute: fetchNotificationData } = useNeNotifications()

  const setupOnMounted = async (onLoggedIn?: () => Promise<void>) => {
    setupPaintWorker()

    watch(y, (pos) => globalY.value = pos)

    try {
      const connected = await connectWallet()
      if (connected)
        walletState.value = 'connected'

      if (user.value)
        setRefreshToken(0)
    } catch (err) {
      console.error("Error mounting app", err)
    }

    watch(isLoggedInAndConnected, (loggedIn) => {
      if (!loggedIn)
        return

      const walletHeaders = {
        'X-Wallet': walletAdress.value ?? "",
        'X-Signing-Token': walletSigningToken.value ?? ""
      }

      useGqlHeaders(walletHeaders)

      setupCurrencyPrice()
      fetchCurrencyData()

      if (onLoggedIn)
        onLoggedIn().then(() => {
          appLoaded.value = true
        })

      fetchMessageData()
      fetchNotificationData()

    }, { immediate: true })
  }

  const setupPaintWorker = () => {
    //@ts-ignore
    const isPaintSupported = !!CSS.paintWorklet

    if (isPaintSupported) {
      //@ts-ignore
      CSS.paintWorklet.addModule('/paint/border.js');
    }

    document.body.classList.toggle('is-paint-supported', isPaintSupported)
    document.body.classList.toggle('is-not-paint-supported', !isPaintSupported)
  }

  return {
    appLoaded,
    setupPaintWorker,
    setupOnMounted
  }
}