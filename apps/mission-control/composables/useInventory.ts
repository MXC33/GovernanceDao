import { NftFragment } from "#gql"

export type InventoryTab = 'land' | 'tech' | 'industry' | 'resources' | 'cargo' | 'collectables'

export type InventoryListId = 'pix' | 'territories' | 'drone'

export const useInventory = () => {
  const { data: gravityGradePackData } = useGravityGradeData()
  const { data: landData, pending: fetchingLand } = useLandData()
  const { nfts, landmarks, ethNFTs, rovers, avatars, aocbadges, geoLottery } = useUserData()



  const inventoryTabs: InventoryTab[] = ['land', 'tech', 'industry', 'resources', 'cargo', 'collectables']
  const slideoutPosition = useState('inventory-slideout-position', () => 0)

  const activeInventoryTab = useState<InventoryTab>('inventory-active-tab', () => 'land')

  const selectedNFT = useState<NftFragment | null>('selected-nft', () => null)

  const isTabNFTsPending = computed(() => {
    switch (activeInventoryTab.value) {
      case 'land':
        return fetchingLand.value
      default:
        return false
    }
  })

  const tabNFTs = computed(() => {
    if (activeInventoryTab.value == 'land')
      return [...(landData.value ?? []), ...(landmarks.value ?? [])]

    const allNFTs = (nfts.value?.concat(ethNFTs.value, rovers.value, avatars.value, aocbadges.value, geoLottery.value).filter(item => tabNFTType.value.includes(item?.tokenInfo.type))) ?? []

    if (activeInventoryTab.value == 'cargo')
      return [gravityGradePackData.value, allNFTs].flat().filter((item) => item && item.tokenId != 0 && item.balance != 0)

    return allNFTs
  })


  const tabNFTType = computed(() => {
    switch (activeInventoryTab.value) {
      case 'land': return ['pix', 'landmark']
      case 'tech': return ['drone', 'rover']
      case 'industry': return ['facility', 'tile-contract']
      case 'resources': return ['biomod', 'astro-credit', 'waste', 'energy', 'raffle-ticket', 'blueprint', 'm3ta-mod']
      case 'cargo': return ['loot-crate', 'avatar-card-pack', 'aoc-badge-pack', 'rover-key']
      case 'collectables': return ['badge', 'metashare', 'genesis', 'aoc-badge', 'avatar', 'geolottery']
      default: return []
    }
  })

  return {
    activeInventoryTab,
    inventoryTabs,
    isTabNFTsPending,
    tabNFTs,
    selectedNFT,
    slideoutPosition
  }
}