export const useAds = () => {
  const oneHour = 3600
  const fourHours = 14400
  const aDay = 86400


  const isBannerActive = useCookieState('banner-active', () => true, { maxAge: aDay, consentLevel: 'preferences' })

  const showAdPopup = useCookieState<boolean>('show-ad-popup', () => true, { consentLevel: 'preferences' })

  return {
    showAdPopup,
    isBannerActive
  }
}