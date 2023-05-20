const isUserAuthenticated = async () => {
  const { walletSigningToken } = useWallet()
  const { loginIX } = useIXAPI()

  console.log("Token", walletSigningToken.value)

  if (!walletSigningToken.value)
    return false

  try {

    await Promise.all([loginIX(walletSigningToken.value), GqlAuthed()])
    return true
  } catch (error) {
    return false
  }
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path == '/connect')
    return true

  const { isWalletConnected, logoutWallet } = useWallet()
  const redirect = useLoginRedirect()
  const { user } = useUser()

  const isUserAuthed = await isUserAuthenticated()

  if (!isWalletConnected.value || !user.value || !isUserAuthed) {
    logoutWallet()
    redirect.value = to.path
    return navigateTo('/connect', { replace: false });
  }

  return true
})