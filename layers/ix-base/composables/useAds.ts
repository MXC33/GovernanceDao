export interface Banner {
  id: string,
  message: string,
  background_color: string,
  backgroundImage: string,
  leftImage: string,
  image: string,
  link: string,
  bannerHide: Array<string>,
  active_time: number
}
export interface BannerResponse {
  success: boolean,
  status: number,
  message: string,
  data: Banner
}

export const useTopBannerData = () => {
  const { fetchIXAPI } = useIXAPI()
  return useAsyncDataState('banner-data', () =>
    fetchIXAPI('banner') as Promise<BannerResponse>, {
    transform: (item) =>
      item.data as Banner
  })
}

export const useAds = () => {

  const { fetchIXAPI } = useIXAPI()

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
      id: "gravity-grade-genesis",
      url: "https://planetix.com/mint/gravity-grade"
    }
  ]

  // const topBannerAd = async () => {
  //   const { fetchIXAPI } = useIXAPI()
  //   let bannerData: Banner = {
  //     id: '',
  //     message: '',
  //     background_color: '',
  //     backgroundImage: '',
  //     leftImage: '',
  //     image: '',
  //     link: '',
  //     active_time: 0
  //   };

  //   try {
  //     const { data } = await fetchIXAPI('banner') as BannerResponse
  //     bannerData = data
  //   } catch (e) { }

  //   return bannerData
  // }



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
