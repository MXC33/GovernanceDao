export default defineNuxtRouteMiddleware(async (to, from) => {
  await useNuxtApp().callHook('page:start')

  if (to.path == '/connect')
    return true

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
