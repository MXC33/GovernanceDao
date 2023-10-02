<template lang="pug">
InfoBoxRow()
  InfoBox() {{$t(`inventory.info.facilityComp`)}}
  InfoBox() {{ selectedNFT?.tokenInfo.tier }}

InfoBoxRow()
  InfoBox() {{$t(`inventory.info.prodMulti`)}}
  InfoBox() {{ productionMultiplier }}
</template>

<script setup lang="ts">
import type { NftFragment } from '#gql'

const props = defineProps<{
  token: NftFragment
}>()

const { selectedNFT } = useInventory()

const productionMultiplier = computed(() => {
  switch (props.token?.tokenInfo.type) {
    case 'pix': return 1
    case 'area': return 3
    case 'sector': return 4
    case 'zone': return 5
    case 'domain': return 6
  }
})

</script>