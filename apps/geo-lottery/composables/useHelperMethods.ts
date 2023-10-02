export const useHelperMethods = () => {

  const checkIsAuth = () => {
    const route = useRoute()
    const { isWalletConnected } = useWallet()
    const { user } = useUser()

    if (!user.value || !isWalletConnected.value) {
      const toRoute = route.path !== '/connect' ? route.path : '/'
      navigateTo({
        path: '/connect',
        query: {
          origin: encodeURIComponent(toRoute)
        }
      })
      return false
    }
    return true
  }

  return {
    checkIsAuth
  }
}
