export const useCookieState = <T extends any>(cookieName: string, init?: () => T | Ref<T>, maxAge?: number) => {
  const cookie = useState(cookieName, () =>
    useCookie<T>(cookieName, {
      default: init,
      maxAge
    })
  )

  watch(cookie, (newValue) => {
    useCookie<T>(cookieName, {
      maxAge
    }).value = newValue
  }, { deep: true })

  return cookie
}