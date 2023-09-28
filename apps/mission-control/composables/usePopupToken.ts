import { NftFragment } from "#gql"
import { v4 as uuid } from 'uuid';
import { Sender } from "./useSender";

export type PopupTokenType = 'balance' | 'link' | 'amount'
export type PopupTokenInfoStatus = 'error' | 'success'

export interface PopupTokenInfo {
  infoType: PopupTokenType
  infoStatus?: PopupTokenInfoStatus
}

export interface PopupTokenLink {
  text: string
  to?: string
  fn?: () => void
}

export interface PopupTokenInfoBalance extends NftFragment, PopupTokenInfo {
  infoType: 'balance'
}


export interface PopupTokenInfoAmount extends NftFragment, PopupTokenInfo {
  infoType: 'amount'
  amount: number
}

export interface PopupTokenInfoLink extends PopupTokenInfo {
  infoType: 'link'
  text: string
  link?: PopupTokenLink
}

export type PopupTokenInfoItem = PopupTokenInfoBalance | PopupTokenInfo | PopupTokenInfoLink | PopupTokenInfoAmount

export interface PopupToken {
  id?: string,
  isRead?: boolean,
  title: string,
  message: string,
  infoItems?: PopupTokenInfoItem[],
  selection?: NftFragment[]
  slideShow?: NftFragment[],
  sender: Sender,
  primaryLink?: PopupTokenLink
  secondaryLink?: PopupTokenLink
}

export const usePopupToken = () => {
  const popups = useState<PopupToken[]>('popup-token', () => [])

  const activePopup = computed<PopupToken | null>(() =>
    popups.value.find(item => item.isRead == false)
  )

  const openPopupLink = async (link: PopupTokenLink) => {
    if (link.fn)
      link.fn()

    if (link.to)
      navigateTo(link.to)

    await useWait(80)

    markActivePopupRead()
  }

  const createBalanceItems = (items: NftFragment[]): PopupTokenInfoBalance[] =>
    items.map((item) => ({
      infoType: 'balance',
      ...item
    }))

  const createAmountItems = (items: NftFragment[], balance?: number): PopupTokenInfoAmount[] =>
    items.map((item) => ({
      infoType: 'amount',
      amount: balance ?? item.balance ?? 1,
      ...item
    }))


  const addPopup = (popup: PopupToken) => {
    popups.value.push({
      ...popup,
      isRead: false,
      id: uuid()
    })
  }


  const markActivePopupRead = () => {
    const currentPopup = activePopup.value
    if (!currentPopup)
      return

    const index = popups.value.findIndex((item) => item.id == currentPopup.id)

    if (index == -1)
      return

    popups.value[index].isRead = true
  }

  return {
    addPopup,
    openPopupLink,
    markActivePopupRead,
    createBalanceItems,
    createAmountItems,
    activePopup
  }
}