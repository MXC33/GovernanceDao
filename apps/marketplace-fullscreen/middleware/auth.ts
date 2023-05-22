export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isWalletConnected, logoutWallet } = useWallet()
  const { user, removeUser } = useUser()


  if (!isWalletConnected.value || !user.value) {
    logoutWallet()
    removeUser()
    return await navigateTo(`/connect?origin=${to.name?.toString()}`)
  }

  return true
})
