export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path == '/connect' || to.path == '/logout')
    return true

  const { walletSigningToken } = useWallet()
  const { user } = useUser()


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
