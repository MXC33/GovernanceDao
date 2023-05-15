
<template lang="pug">
th(p="3")
  button(v-if="item.sortable" @click="onClickSort" flex="~ row" items="start" opacity="50 hover:75 on-active:100" :active="isActive" transition="all")
    HList()
      slot
      Transition(name="fade" mode="out-in")
        UpArrowIcon.icon(v-if="direction == 'desc'")
        DownArrowIcon.icon(v-else)

  HList(v-else items="start")
    slot
      
</template>

<script setup lang="ts">
import UpArrowIcon from '../icons/UpArrowIcon.vue';
import DownArrowIcon from '../icons/DownArrowIcon.vue';
import type { TableColumn } from '~/composables/useTable';

const { toggleDirection, selectField, sortSettings } = useCollectionSettings()

const props = defineProps<{
  item: TableColumn
}>()

const isActive = computed(() => sortSettings.value.field == props.item.value)

const direction = computed(() => {
  if (isActive.value)
    return sortSettings.value.direction

  return 'asc'
})

const onClickSort = () => {
  if (isActive.value)
    return toggleDirection()

  return selectField(props.item.value)
}
</script>

<style scoped></style>