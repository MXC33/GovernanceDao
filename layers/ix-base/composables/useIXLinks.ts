import type { Corporation } from '~/composables/corporations/useCorporations'

type IXPage = 'index' | 'game' | 'raffles' | 'drops' | 'ix-foundation'

export const useIXLinks = () => {

  const openCorporation = (corporation: Corporation) => {
    switch (corporation) {
      case 'net-empire':
        return gotoIXPage('game')
      case 'gravity-grade':
        return gotoIXPage('drops')
      case 'lucky-cat':
        return gotoIXPage('raffles')
    }
  }

  const authSuffix = (page: string) => `&page=${page}`

  const gotoIXPage = (page: IXPage, withAuth: boolean = true) => {
    const { walletSigningToken } = useWallet()
    const authedSuffix = page == 'index' ? '' : authSuffix(page)
    const unAuthSuffix = page == 'index' ? '' : page

    if (page == 'ix-foundation')
      return window.location.href = 'https://dashboard.ix.foundation/'

    if (page == 'drops')
      return window.location.href = 'https://planetix.com/drops'

    if (walletSigningToken.value && withAuth)
      window.location.href = `https://planetix.com/auth?token=${walletSigningToken.value}${authedSuffix}`
    else
      window.location.href = `https://planetix.com/${unAuthSuffix}`
  }

  return { gotoIXPage, openCorporation }
}