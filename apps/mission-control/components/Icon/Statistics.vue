<template lang="pug">
img(:src="icon")
</template>

<script lang="ts" setup>
import IXTIcon from '~/assets/images/ui/user/statistics/icon-IXT.png'
import TerritoriesIcon from '~/assets/images/ui/user/statistics/icon-territories.png'
import IXTLoot from '~/assets/images/ui/user/statistics/icon-loot.png'

const icon = computed(() => {
  switch (props.icon) {
    case 'pix_traded': return IXTIcon
    case 'territories_created': return TerritoriesIcon
    case 'loot_crates_found': return IXTLoot
  }
})

const props = defineProps<{
  icon: string
}>()

</script>