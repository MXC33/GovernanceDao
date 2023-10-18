export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path == '/connect' || to.path == '/logout')
    return true

  const { walletSigningToken, walletAdress } = useWallet()

  if (!walletSigningToken.value || !walletAdress.value) {
    return navigateTo({
      path: '/logout',
      query: {
        origin: encodeURIComponent(to.path)
      }
    })
  }

  const walletHeaders = {
    'X-Wallet': walletAdress.value ?? "",
    'X-Signing-Token': walletSigningToken.value ?? ""
  }

  useGqlHeaders(walletHeaders)

  return true
})
