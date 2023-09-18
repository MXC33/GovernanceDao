<template lang="pug">
VList(w="full")
  TitleWithIcon(icon="pointer" fill="#f9f9f9")
    TokenName(:token="task" font="bold" :key="getNftTokenKey(task, '-', true)")

  ListItemProps(v-if="task.tokenInfo.type == 'rover'")
    template(#name) {{ $t('general.status') }} 
    template(#value) 
      span(:class="[`yspace-${task.status}`]") {{ task.status }}

  ClientOnly
    ListItemProps
      template(#name) {{ $t('taskManager.dailyOutput') }}
      template(#value v-if="task.status != 'wrecked'") {{ outputTile }}
      template(#value v-else)
        span(color="mc-red") 0

  ListItemProps()
    template(#name) {{ task.resourceType }} {{ $t('taskManager.harvesting') }}
    template(#value v-if="task.status != 'wrecked'") {{ task.resourceAmount }}
    template(#value v-else)
      span(color="mc-red") {{ task.resourceAmount }}

  ListItemProps()
    template(#name) ET.
    template(#value)
      span()
        slot(name="value")

</template>

<script lang="ts" setup>
import type { OrderTask, Task } from '~/composables/useTasks'

const { findTileGroup } = useTiles()
const { getNftTokenKey } = useNFTs()
const { wasteOutputPerDay } = useTileMetaData()

const props = defineProps<{
  task: OrderTask
  displayValue: string
}>()

const outputTile = computed(() => {
  const tiles = findTileGroup(props.task.tile)
  const output = computed(() => wasteOutputPerDay(tiles.ring, tiles.assets))

  return output
})

</script>

<style>
.yspace-pristine {
  color: var(--mc-finegreen)
}

.yspace-worn {
  color: var(--mc-warning)
}

.yspace-damaged {
  color: var(--mc-red)
}

.yspace-wrecked {
  color: var(--mc-gray-400)
}
</style>