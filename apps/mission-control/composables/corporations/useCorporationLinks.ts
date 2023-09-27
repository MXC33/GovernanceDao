import { Corporation } from "./useCorporations"

export type CorporationLinkType = 'internal' | 'external' | 'disabled'


export const useCorporationLinks = () => {
  const linkType = (corporation: Corporation) => {
    const external: Corporation[] = ['net-empire']
    const disabled: Corporation[] = ['arcade']

    if (disabled.includes(corporation))
      return 'disabled'
    if (external.includes(corporation))
      return 'external'

    return 'internal'
  }

  const clickLink = (corporation: Corporation) => {
    const router = useRouter()
    const { openCorporation } = useIXLinks()

    const type = linkType(corporation)
    if (type == 'internal')
      return router.push('/' + corporation)

    if (type == 'external')
      return openCorporation(corporation)
  }

  return {
    linkType,
    clickLink
  }
}

