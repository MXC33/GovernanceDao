<template lang="pug">
component.svg-shadow-orange(:is="tabIcon")
</template>

<script lang="ts" setup>
import OverviewIcon from '~/assets/images/ui/game/overview.svg'
import BuildIcon from '~/assets/images/ui/game/build.svg'
import TaskManagerIcon from '~/assets/images/ui/game/task-manager.svg'
import InventoryIcon from '~/assets/images/ui/game/inventory.svg'
import RaidIcon from '~/assets/images/ui/game/raid.svg'
import StarterIcon from '~/assets/images/ui/game/starter-pack.svg'
import type { GameMenuId } from '~/composables/types'

const tabIcon = computed(() => {
  switch (props.icon) {
    case 'build': return BuildIcon
    case 'task-manager': return TaskManagerIcon
    case 'inventory': return InventoryIcon
    case 'raid': return RaidIcon
    case 'starter-pack': return StarterIcon
    case 'overview': return OverviewIcon
  }
})
const props = defineProps<{
  icon: GameMenuId
}>()

</script>

<style>
svg.svg-shadow-orange {
  filter: drop-shadow(0px 0px 6px rgba(255, 102, 71, 0.5));
}
</style>