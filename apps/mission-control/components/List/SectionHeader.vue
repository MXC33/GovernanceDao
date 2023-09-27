<template lang="pug">
VList.list-header(pos="relative" :class="[isSelected ? 'is-selected': null]")
  TaskHeaderWide(w="full" v-if="isWide")
  TaskHeaderBigger(w="full" v-else-if="isBig")
  TaskHeader(w="full" v-else )

  VList(w="full" h="full" pos="absolute left-0" p="t-2 l-4" items="start" max-w="35 on-wide:50" justify="center" :wide="isWide" font="bold" uppercase="~" color="$mc-accent on-active:mc-mint" :active="isSelected")
    slot()

</template>

<script setup lang="ts">
import TaskHeaderBigger from '~/assets/images/ui/task-manager/header-line-bigger.svg'
import TaskHeader from '~/assets/images/ui/task-manager/header-line.svg'
import TaskHeaderWide from '~/assets/images/ui/task-manager/header-line-wide.svg'


defineProps<{
  isBig?: boolean,
  isWide?: boolean,
  isSelected?: boolean
}>()

</script>

<style>
.list-header svg path {
  stroke: var(--mc-accent);
  transition: all 300ms;
}

.list-header.is-selected svg path {
  stroke: var(--mc-mint);
  stroke-opacity: 1;
}
</style>