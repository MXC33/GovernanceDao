export const useCookies = () => {
  const oneHour = 3600
  const fourHours = 14400
  const aDay = 86400

  const isCoockieActive = useCookieState('show-lottery', () => true, { maxAge: aDay, consentLevel: 'preferences' })

  return {
    isCoockieActive
  }
}
