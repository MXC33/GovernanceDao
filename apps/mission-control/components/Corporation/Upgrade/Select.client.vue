<template lang="pug">
CorporationItemsAndDetail(list-title="Facilities" v-model="selectedUpgrade" :list="items" detail-title="Active Item")
  template(#grid)
    CorporationItemsAndDetailGridItem(:item="item" v-for="item in items" v-model="selectedUpgrade")
      template(#details)
        HList(space-x="1") 
          div {{ $t(`general.tier`) }}:
          div {{ item.token.tokenInfo.tier }}

        HList(space-x="1" justify="start")
          div {{ $t(`general.level`) }}: 
          div(color="$mc-accent") {{ item.token.tokenInfo?.level }}

  template(#cartRight)
    slot(name="cart")
      CorporationCartRow()
        HList(justify="center" items="center" space-x="1" uppercase="~")
          div(color="white") {{ $t(`general.selected`) }}:
          div(:color="tierColorMap") 
            TokenName(:token="selectedUpgrade.token")

        ButtonSound(sound="sm" btn="~ accent-filled on-disable:disable" @click="onClickNext" :disable="!canUpgrade") {{ $t(`general.next`) }}
          

</template>
  
<script lang="ts" setup>
import type { CorporationAdjustableToken } from '~~/composables/corporations/useCorporations';
const { selectedUpgrade } = useFacilityUpgrade()
// const { getTokenLevel } = useNFTs()
const { goForward } = useCorporationRoute()

const { data: playerLevel } = usePlayerBaseLevelData()

defineProps<{
  items: CorporationAdjustableToken[]
}>()

const tierColorMap = computed(() => {
  switch (selectedUpgrade.value.token?.tokenInfo.tier) {
    case 'outlier':
      return 'tier-white'
    case 'common':
      return 'tier-green'
    case 'uncommon':
      return 'tier-blue'
    case 'rare':
      return 'tier-purple'
    case 'legendary':
      return 'tier-gold'
  }
})

const canUpgrade = computed(() => selectedUpgrade.value.token?.tokenInfo?.level == 1 && playerLevel.value >= 30)


const onClickNext = async () => {
  const id = selectedUpgrade.value.token?.tokenId
  if (!id)
    return

  goForward(String(id))
}



</script>