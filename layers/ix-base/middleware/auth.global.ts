export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useAppConfig()
  if (to.path == '/connect' || to.path == '/logout')
    return true
  const { walletSigningToken, walletAdress } = useWallet()

  const walletHeaders = {
    'X-Wallet': walletAdress.value ?? "",
    'X-Signing-Token': walletSigningToken.value ?? ""
  }

  useGqlHeaders(walletHeaders)

  if (config.ixApp == 'foundation') {
    return true
  }

  if (!walletSigningToken.value || !walletAdress.value) {
    return navigateTo({
      path: '/logout',
      query: {
        origin: encodeURIComponent(to.path)
      }
    })
  }

  return true
})
