const isUserAuthenticated = async () => {
  try {
    await GqlAuthed()
    return true
  } catch (error) {
    return false
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path == '/connect' || !to.name)
    return true

  const { isWalletConnected, walletAdress, walletSigningToken, logoutWallet } = useWallet()
  const { user } = useUser()

  // const isUserAuthed = await isUserAuthenticated()

  if (!isWalletConnected.value || !user.value) {
    logoutWallet()
    return navigateTo(`/connect?origin=${to.name.toString()}`)
  }
  return true
})