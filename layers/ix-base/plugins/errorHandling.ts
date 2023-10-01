export default defineNuxtPlugin(nuxtApp => {
  const route = useRoute()

  nuxtApp.hook('vue:error', (err: any) => {
    const unauthorized = err?.gqlErrors?.some((e: any) => e?.message?.includes('authenticated'))

    console.log("Yo")

    if (unauthorized) {
      navigateTo({
        path: '/logout',
        query: {
          origin: encodeURIComponent(route.path)
        }
      })
    }
  })
});
