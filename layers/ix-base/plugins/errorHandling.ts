export default defineNuxtPlugin(nuxtApp => {
  const { logoutWallet } = useWallet()
  const { removeUser } = useUser()
  const route = useRoute()

  nuxtApp.hook('vue:error', (err: any) => {
    const unauthorized = err?.gqlErrors?.some((e: any) => e?.message?.includes('authenticated'))

    if (unauthorized) {

      logoutWallet()
      removeUser()


      const token = useCookie('web3Token')
      const acc = useCookie("wallet-accounts")
      token.value = null
      acc.value = null

      console.log("UNAUTHORIZED GQL")

      navigateTo({
        path: '/connect',
        query: {
          redirectUrl: encodeURIComponent(route.path)
        }
      })
    }
  })
});
