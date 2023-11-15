import { get } from "@vueuse/core"

type EmptyObject = Record<string, never>
type CookieConsent = typeof Cookiebot.consent
type CookieConsentLevel = keyof CookieConsent

interface CookieStateOptions {
  maxAge?: number,
  consentLevel?: CookieConsentLevel
}

const useCookieDomain = () =>
  process.client && window?.location?.host?.includes("planetix") ? 'planetix.com' : undefined


export const useCookieConsentState = () => {
  const { readCookieValue } = useConsentCookie()
  return useState<CookieConsent | EmptyObject>('cookie-consent-state', () => readCookieValue())
}

export const useConsentCookie = () => {
  const domain = useCookieDomain()
  const cookie = useCookie<string>("CookieConsent", { domain })

  const readCookieValue = (): CookieConsent | EmptyObject => {
    try {
      let obj = {}

      cookie.value?.slice(1, -1).split(',').forEach((prop) => {
        const tup = prop.split(':')

        let value: string | boolean = tup[1].replaceAll("'", "")
        if (value == "true")
          value = true
        if (value == "false")
          value = false

        //@ts-ignore
        obj[tup[0]] = value
      })
      return obj as CookieConsent
    } catch (err) {
      return {}
    }
  }

  return {
    readCookieValue
  }
}

export const useCookieState = <T extends any>(cookieName: string, initValue?: () => T | Ref<T>, options: CookieStateOptions = {}) => {
  const { maxAge, consentLevel = 'necessary' } = options
  const consentState = useCookieConsentState()
  const domain = useCookieDomain()
  const cookie = useCookie<T | null | undefined>(cookieName, { maxAge, domain })

  const hasConsent = computed(() => {
    const hasConsent = consentState.value && consentState.value[consentLevel]

    return consentLevel == 'necessary' || hasConsent
  })

  const defaultValue = () => {
    const hasCookie = cookie.value !== undefined
    return hasCookie ? cookie.value : initValue && get(initValue())
  }

  const state = useState(cookieName, () =>
    defaultValue()
  )

  const updateCookie = (newValue: T | null | undefined) => {
    if (!hasConsent.value)
      return

    cookie.value = newValue
  }

  const clearValue = () => {
    cookie.value = null
  }

  useRunOnce(`cookie-consent-${cookieName}`, () => {
    watch([consentState, hasConsent], ([_, newValue], [__, oldValue]) => {
      if (!hasConsent.value) {
        return clearValue()
      }
    }, { deep: true })

    watch(state, (newValue) => {
      updateCookie(newValue)
    }, { deep: true })
  })

  return state
}
