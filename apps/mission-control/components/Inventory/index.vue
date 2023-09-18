<template lang="pug">
VList(flex-grow="1" min-h="0" pos="relative" bg="black" overflow="hidden" )
  InventoryBackground()

  HList(text="sm" justify="between" items="start" p="x-2 md:x-4 y-4" z="1")
    TitleWithPointer(text="base" font="bold") {{$t(`inventory.title`)}}

  InventoryTabList(mb="2")

  VList(flex-grow="1" min-h="0" space-y="1 md:6" p="2 t-0 md:t-2 md:4" align="center" w="full" mx="auto" z="1" v-if="hasUser")

    div(grid="md:~ cols-3 gap-5" min-h="0" flex="lt-md:~ col grow" justify="center" v-if="tabNFTs.length > 0")
      InventoryList(w="full" :style="listMobilePadding")

      InventoryImage(:disable-bg-animation="false" v-if="!isMobile")

      InventoryInfo(v-if="!isMobile && selectedNFT" :token="selectedNFT" :key="getNftTokenKey(selectedNFT)")

    VList(p="4" v-else)
      VList(items="center")
        InventoryListOpenAvatars(v-if="activeInventoryTab == 'cargo'" w="100")
      InventoryEmpty(v-if="!isTabNFTsPending")

  InventoryMobile(v-if="isMobile")

</template>

<script setup lang="ts">
const isMobile = useMobileBreakpoint('md')
const { tabNFTs, isTabNFTsPending, slideoutPosition, activeInventoryTab } = useInventory()
const { selectedNFT } = useInventory()
const { hasUser } = useUser()
const isSlideoutOpen = computed(() => isMobile.value && !!selectedNFT.value)
const { getNftTokenKey } = useNFTs()
const { fetchUserInventory } = useUserData()

await fetchUserInventory()

const listMobilePadding = computed(() => {
  if (!isSlideoutOpen.value)
    return 0

  const yPos = Math.max(Math.abs(slideoutPosition.value) - 50, 0)

  return {
    paddingBottom: yPos + 'px'
  }
})

</script>