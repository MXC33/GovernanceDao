import { CorporationOrderId } from "./order/defineOrderContract"
import { Corporation, CorporationAction } from "./useCorporations"

export const useCorporationNotifications = () => {
  const { t } = useI18n()
  const { activeSpeedupOrder, latestClaim, orderAmountTaxed } = useCorporationOrders()
  const { addPopup, createAmountItems } = usePopupToken()
  const { resetTransactionState } = useTransactions()

  const getSender = (corporation: Corporation) => {
    switch (corporation) {
      case 'new-lands':
        return 'jeremiah'
      case 'eternalab':
        return 'eve-pryde'
      case 'gws':
        return 'buck'
      // case 'y-space':
      //   return 'mayflower'
      case 'astro-cap':
        return 'mmi-das'
    }
  }

  const successMessage = (action: CorporationAction): string | null => {
    switch (action) {
      case 'speedup':
        return "Acceleration successful. Processing Unit indicating nominal values, agent."
      case 'speedup-cooldown':
        return "Old chap! You’ve gone and decreased the cooldown period for your facility upgrades. Splendid work!"
      default:
        return null
    }
  }

  const failMessage = (corporation: Corporation, type: CorporationAction) => {
    switch (type) {
      case 'craft':
        return placeFailedMessage(corporation)
      case 'speedup':
        return "Malfunction detected, agent. Initial timeframe still running accordingly."
      case 'claim':
        return "Error occurred, agent. But your claim is legitimate. We’re solving it right away."
    }
  }

  const placeFailedMessage = (corporation: Corporation) => {
    switch (corporation) {
      case 'gws':
        return "Transaction failed. Shit."
      case 'eternalab':
        return "The transaction failed, dear. The entropy is all wrong. A.M.E?"
      case 'new-lands':
        return "Gosh, that failed. But what’s failure but another stepping stone to greatness, eh?"
      case 'lucky-cat':
        return "Transaction failed, another time it succeeds. Things are as they are-desu!"
    }
  }

  const onClaimedOrder = async (corporation: CorporationOrderId, tokenId: number, balance: number = 1) => {
    activeSpeedupOrder.value = null

    const { data, refresh: fetchClaimedToken } = useTokenInfo(tokenId)

    await fetchClaimedToken()
    const nft = data.value

    latestClaim.value = { nft, corporation: corporation.type }

    const prospectTask = t(`${corporation.type}`)

    const failureTitle = t(`taskManager.orderClaim.failure.eternalab.title`)
    const backToLab = t(`taskManager.orderClaim.failure.eternalab.buttonTry`)
    const gotoInventory = t(`taskManager.orderClaim.buttons.goTo`)
    const failureDescription = t(`taskManager.orderClaim.failure.eternalab.description`)
    const claimSuccess = t(`taskManager.orderClaim.success.${corporation.type}`)

    const title = nft?.tokenInfo?.type == 'nothing' ? failureTitle : prospectTask
    const primaryButtonText = nft?.tokenInfo?.type == 'nothing' ? backToLab : gotoInventory
    const message = nft?.tokenInfo?.type == "nothing" ? failureDescription : claimSuccess
    const gwsBalance = orderAmountTaxed(balance, corporation)

    console.log("gwsBalance", gwsBalance)

    const items = createAmountItems([nft], gwsBalance)
    const primaryLink = nft?.tokenInfo?.type == 'nothing' ? '/eternalab' : '/'

    resetTransactionState()

    addPopup({
      title,
      message,
      sender: getSender(corporation.type),
      infoItems: items,
      slideShow: items,
      primaryLink: {
        text: primaryButtonText,
        to: primaryLink
      },
      secondaryLink: {
        text: t('general.close')
      }
    })
  }



  return {
    onClaimedOrder,
    successMessage,
    failMessage,
    getSender,
  }

}
