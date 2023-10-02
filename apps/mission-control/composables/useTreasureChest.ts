import { NftFragment } from "#gql"
import { useGravityGradePackContentData } from "./useGravityGradePackContent"

export interface OpenPack {
  token: NftFragment,
  amount: number
}

export const useOpenPacks = () => {
  const { addPopup, createAmountItems } = usePopupToken()
  const currentPack = useState<OpenPack | null>('pack-token', () => null)

  const isOpeningPack = computed(() => currentPack.value != null)

  const viewPack = (pack: NftFragment, amount: number) => {
    currentPack.value = {
      token: pack,
      amount
    }
  }

  const openPack = () => {
    closeChest()
  }

  const closeChest = () => {
    currentPack.value = null
  }

  const onMintedAnniversaryPack = (pack: NftFragment, amount: number) => {
    console.log("Open", pack, amount)

    addPopup({
      title: 'Pack opened',
      message: `Celebration is about to begin. This pack was created on our anniversary`,
      sender: 'wp5813',
      infoItems: createAmountItems([pack]),
      slideShow: [pack],
      primaryLink: {
        text: 'Done'
      }
    })

    closeChest()
  }

  const onMintedPack = async (pack: NftFragment, amount: number, contents?: NftFragment[]) => {
    const { data, execute: fetchGGContents } = useGravityGradePackContentData({ type: pack.tokenInfo.type, tier: pack.tokenInfo.tier })

    if (!contents)
      await fetchGGContents()


    const items = contents ?? data.value.map(item => ({
      ...item,
      balance: (item.token.balance ?? 1) * amount
    })).filter(item => !item.probability).map(item => item.token)


    addPopup({
      title: pack.tokenInfo.title,
      message: chooseMessage(pack),
      sender: 'wp5813',
      infoItems: createAmountItems(items),
      slideShow: items,
      primaryLink: {
        text: 'Done'
      }
    })

    closeChest()
  }

  const onAvatarClaim = async (avatar: NftFragment, amount: number) => {

    const { execute: fetchTokenInfo, data } = useTokenInfo(avatar.tokenId, avatar.contract)
    await fetchTokenInfo()

    addPopup({
      title: data.value.tokenInfo.title,
      message: `Despite the analysis of even my most intimate data, I have efficiently delivered the goods. The backstory of each avatar is now available in Inventory, brrpp!`,
      sender: 'wp5813',
      infoItems: createAmountItems([data.value], amount),
      slideShow: [data.value],
      primaryLink: {
        text: 'Done'
      }
    })

    closeChest()
  }

  const chooseMessage = (pack: NftFragment) => {
    switch (pack.tokenInfo.type) {
      case 'cargo-drop':
        return `The delivery of this heavy cargo was completed in just 241742135 human neural experiences. And now, the goods are ready to be used! Yet another example that I always deliver.`
      case 'gg':
        return `Do not adjust your circuits yet, human! The delivery process is completed and you’ll find the following and potentially even more assets in your inventory, brrpp.`
      case 'avatar-card-pack':
        return `Despite the analysis of even my most intimate data, I have efficiently delivered the goods. The backstory of each avatar is now available in Inventory, brrpp!`
      case 'aoc-badge-pack':
        return `I, the most finely tuned postbot in the solar system, delivered the following assets without error. Analysis indicate a tip is in order, brrrppp.`
      case 'loot-crate':
        return `Brrpp. Loot Crate delivered and open with efficient success.`
    }

  }





  return {
    currentPack,
    isOpeningPack,
    onMintedPack,
    onMintedAnniversaryPack,
    onAvatarClaim,
    closeChest,
    viewPack,
    openPack,
  }
}