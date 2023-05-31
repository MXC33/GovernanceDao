export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path == '/connect')
    return true

  if (to.path == '/')
    return navigateTo('/assets/polygon/0xba6666b118f8303f990f3519df07e160227cce87')

  const { isWalletConnected, logoutWallet } = useWallet()
  const redirect = useLoginRedirect()
  const { user, removeUser } = useUser()


  if (!isWalletConnected.value || !user.value) {
    logoutWallet()
    removeUser()
    redirect.value = to.path
    return navigateTo('/connect', { replace: false });
  }

  return true
})
