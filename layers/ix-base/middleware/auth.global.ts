export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("MIDDLEWARE", to.path)
  if (to.path == '/connect' || to.path == '/logout')
    return true

  const { isWalletConnected, walletSigningToken } = useWallet()
  const { user } = useUser()

  console.log("WALLET", !isWalletConnected.value, !user.value, encodeURIComponent(to.path))

  if (!walletSigningToken.value || !user.value) {
    return navigateTo({
      path: '/logout',
      query: {
        origin: encodeURIComponent(to.path)
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
