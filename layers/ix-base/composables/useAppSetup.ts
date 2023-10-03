export const useAppSetup = () => {
  const globalY = useGlobalWindowScroll()

  const { y } = useWindowScroll()
  const { connectWallet, walletState, walletSigningToken } = useWallet()
  const { setupIXTPrice } = useIXTPrice()
  const { setRefreshToken, isLoggedInAndConnected } = useLogin()
  const { user } = useUser()
  const { refresh: fetchCurrencyData } = useCurrencyData()
  const { execute: fetchMessageData } = useNeMessages()
  const { execute: fetchNotificationData } = useNeNotifications()

  const setupOnMounted = async (onLoggedIn?: () => void) => {
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
        'X-Wallet': user.value.wallet_address ?? "",
        'X-Signing-Token': walletSigningToken.value ?? ""
      }

      useGqlHeaders(walletHeaders)
      setupIXTPrice()
      fetchCurrencyData()

      if (onLoggedIn)
        onLoggedIn()

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
    setupPaintWorker,
    setupOnMounted
  }
}