import { NftFragment } from '#gql'
import { TokenWithInfoBlocks } from 'composables/useInfoBlocks'
import { Corporation } from './useCorporations'

const normalizeChainCorporation = (corporation: string): Corporation => {
  const corporationId = corporation?.toLowerCase()

  switch (corporationId) {
    case 'global waste systems':
      return 'gws'
    case 'newlands':
      return 'new-lands'
    case 'y_':
      return 'y-space'
    case 'netempire':
      return 'net-empire'
    case 'eternalabs':
      return 'eternalab'
    default:
      return corporationId as Corporation
  }
}

export const useCorporationBurn = () => {
  const activeBurnItem = useState<TokenWithInfoBlocks>('corporation-selected-burn', () => null)

  const corporation = useActiveCorporation()
  const { getTokenAttribute } = useNFTs()
  const { refresh: refreshBurnInfo } = useAvatarBurnedData(corporation.value)
  const { t } = useI18n()

  const completion = useCorporationCompletion()
  const { burnAvatar } = useAvatarNFTContract()

  const { addPopup } = usePopupToken()
  // const { getSender } = useSender()
  const { walletSigningToken } = useWallet()

  const canBurnInCorporation = (list: NftFragment[], corporation: Corporation) =>
    list.filter((item) => {
      const attribute = getTokenAttribute(item, 'corporation')

      if (!attribute)
        return false

      return corporation == normalizeChainCorporation(attribute as Corporation)
    })


  const onBurnSuccess = async () => {
    completion.gotoCompleted()
    await cacheBust()
    await refreshBurnInfo()
  }

  const cacheBust = async () => {
    const body = { corporation: corporation.value, token: walletSigningToken.value }
    await $fetch('/api/cachebust', {
      method: `POST`,
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const confirmBurn = async () => {
    const tokenId = activeBurnItem.value?.token?.tokenId

    const success = await burnAvatar(Number(tokenId), corporation.value)

    if (success)
      await onBurnSuccess()
  }

  const onClickBurn = () => {
    const burnItem = activeBurnItem.value?.token
    if (!burnItem)
      return

    addPopup({
      // fix for now
      sender: 'proxy-of-change',
      // sender: getSender(corporation.value),
      title: 'Confirm Burn',
      message: t(`corporations.burn.confirm`, { corporation: corporation.value }),
      infoItems: [{
        ...burnItem,
        amount: 1,
        infoType: 'amount',
        infoStatus: 'error'
      }],
      slideShow: [burnItem],
      primaryLink: {
        text: t('general.confirm'),
        fn: () => confirmBurn()
      },
      secondaryLink: {
        text: t('general.cancel'),
      }
    })
  }

  return {
    ...completion,
    onClickBurn,
    canBurnInCorporation,
    activeBurnItem
  }
}