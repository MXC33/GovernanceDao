export default defineNuxtRouteMiddleware(async (to, from) => {
  
  if (to.path == '/connect')
    return true

  const { isWalletConnected, logoutWallet } = useWallet()
  const { user, removeUser } = useUser()

  if (!isWalletConnected.value || !user.value) {
    logoutWallet()
    removeUser()

    return navigateTo({
      path: '/connect',
      query: {
        redirectUrl: encodeURIComponent(to.path)
      }
    })
  }

  return true
})
