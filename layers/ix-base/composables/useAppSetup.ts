export const useAppSetup = () => {
  const globalY = useGlobalWindowScroll()

  const { y } = useWindowScroll()
  const { connectWallet, walletState } = useWallet()
  const { setupIXTPrice } = useIXTPrice()
  const { refreshIXTBalance } = useIXTContract()
  const { setRefreshToken, isLoggedInAndConnected } = useLogin()
  const { user } = useUser()

  const { execute: fetchHeaderData } = useHeaderData()
  const { execute: fetchMessageData } = useNeMessages()
  const { execute: fetchNotificationData } = useNeNotifications()

  const setupOnCreated = async () => {
    await fetchHeaderData()
    watch(y, (pos) => globalY.value = pos)
  }

  const setupOnMounted = async () => {
    setupPaintWorker()

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

      fetchMessageData()
      fetchNotificationData()

      setupIXTPrice()
      refreshIXTBalance()
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
    setupOnMounted,
    setupOnCreated
  }
}