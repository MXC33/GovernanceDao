export default defineNuxtRouteMiddleware(async (to, from) => {

  if (to.path == '/connect')
    return true

  const { isWalletConnected, walletSigningToken, logoutWallet } = useWallet()
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

  const walletHeaders = {
    'X-Wallet': user.value.wallet_address ?? "",
    'X-Signing-Token': walletSigningToken.value ?? ""
  }

  useGqlHeaders(walletHeaders)

  return true
})
