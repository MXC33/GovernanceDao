export const useCookieState = <T extends any>(cookieName: string, init?: () => T | Ref<T>, maxAge?: number) => {
  const domain = process.client && window?.location?.host?.includes("planetix") ? 'planetix.com' : undefined

  const cookie = useState(cookieName, () =>
    useCookie<T>(cookieName, {
      default: init,
      maxAge,
      domain
    })
  )

  watch(cookie, (newValue) => {
    useCookie<T>(cookieName, {
      maxAge,
      domain
    }).value = newValue
  }, { deep: true })

  return cookie

}