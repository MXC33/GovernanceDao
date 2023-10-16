export const useAds = () => {
  const oneHour = 3600
  const fourHours = 14400
  const aDay = 86400
  const config = useAppConfig()


  interface AdData {
    id: string
    url: string
  }

  const ads: AdData[] = [
    {
      id: 'territory-lottery',
      url: "https://territorylottery.planetix.com/"
    },
    {
      id: "gravity-grade-genesis",
      url: "https://planetix.com/mint/gravity-grade"
    }
  ]

  const bannerAdActive = useCookieState(`ad-banner-${config.ixApp}`, () => true, { maxAge: aDay, consentLevel: 'preferences' })

  const showAdPopup = useCookieState<boolean>('show-ad-popup', () => true, { consentLevel: 'preferences' })

  const boxAdActive = useCookieState(`ad-box-${config.ixApp}`, () => true, { maxAge: aDay, consentLevel: 'preferences' })

  const randomSwitchAds = useState('ad-random-switch', () => Math.floor(Math.random() * ads.length))

  const activeAd = computed(() => ads[randomSwitchAds.value])



  return {
    showAdPopup,
    bannerAdActive,
    boxAdActive,
    activeAd
  }
}