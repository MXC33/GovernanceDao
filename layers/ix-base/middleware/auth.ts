const isUserAuthenticated = async () => {
  try {
    await GqlAuthed()
    return true
  } catch (error) {
    return false
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isWalletConnected, walletAdress, walletSigningToken, logoutWallet } = useWallet()
  const { user } = useUser()

  useGqlHeaders({ 'X-Wallet': walletAdress.value, 'X-Signing-Token': walletSigningToken.value })

  const isUserAuthed = await isUserAuthenticated()

  if (!isWalletConnected.value || !user.value || !isUserAuthed) {
    logoutWallet()
    return await navigateTo(`/connect?origin=${to.name.toString()}`)
  }
  return true
})