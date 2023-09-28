<template lang="pug">
VList(w="full" pos="fixed" inset="0" z="999" bg="mc-black" p="3" flex-center="col")

  OpenPackStarsBackground(z="-1" pos="absolute" :speed="0.3" :token="pack.token")

  VList(max-w="160" w="full" space-y="2" min-h="0")
    VList(pos="relative" align="center" min-h="0" justify="center")
      OpenPackStarsShade(opacity="100")

      TokenImage(:token="pack.token" :key="getNftTokenKey(pack.token)" :is-large="true" pos="relative"  mx="auto" w="full" min-h="0" mix-blend="lighten")

    HList(pos="relative" b="1 mc-orange opacity-40" p="2" bg="mc-black opacity-60" backdrop="blur-md")
      TokenName(:token="pack.token" flex-grow="1")
      div x{{ pack.amount }}

    div(grid="~ cols-3 gap-2")
      div 

      ButtonSound(sound="sm" cut="bottom-right b-$mc-mint" bg="hover:$mc-mint-10" btn="~ secondary-outline" @click="closeChest" backdrop="blur-md") {{$t(`general.close`)}}

      ButtonSound(sound="sm" cut="bottom-right b-$mc-mint"  btn="~ primary" @click="onClickOpen" backdrop="blur-md") {{$t(`general.confirm`)}}

</template>

<script setup lang="ts">
import type { OpenPack } from '~~/composables/useTreasureChest';

const { getNftTokenKey } = useNFTs()
const { closeChest, openPack } = useOpenPacks()
const { openLootCrate } = useLootChestContract()
const { burnGenericGGpack } = useGenericBurnGravityGradeContracts()
const { burnAOCBadgePack, burnAvatarCardPack } = useGenericBurnPixAssetsContract()
const { burnGGPack } = useBurnGravityGradeContract()
const { burnPackV2 } = useGenericBurnGravityGradeV2Contract()


const props = defineProps<{
  pack: OpenPack
}>()

const onClickOpen = async () => {
  const { token, amount } = props.pack
  const { type, tier } = token.tokenInfo

  const isAnniversaryPack = type == 'anniversary-pack'
  const isStarterPackOne = type == 'starter-pack' && tier == '1'
  const isCargoDrop2 = type == 'cargo-drop' && tier == '2'
  const isGGv2Pack = type == 'gg-energy' || type == 'gg2' || type == 'voucher' || type == 'rover-key' || type == 'gg2-energy' || type == 'gg3-energy' || type == 'gg4-energy'

  if (type == 'loot-crate')
    await openLootCrate(amount)
  else if (type == 'avatar-card-pack')
    await burnAvatarCardPack(32, amount)
  else if (type == 'aoc-badge-pack')
    await burnAOCBadgePack(51, amount)
  else if (isGGv2Pack)
    await burnPackV2(props.pack.token, amount)
  else if (isAnniversaryPack || isStarterPackOne || isCargoDrop2)
    await burnGGPack(props.pack.token, amount)
  else
    await burnGenericGGpack(props.pack.token, amount)


  openPack()
}

</script>
