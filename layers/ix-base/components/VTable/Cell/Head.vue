
<template lang="pug">
th()
  div.head-cell.sortable(v-if="props.sortable" :class="props.active ? 'active' : ''", @click="emit('sort')" p="3")

    slot
      UpArrowIcon.icon(v-if="props.asc")
      DownArrowIcon.icon(v-else)

  .head-cell(v-else)
    slot
      
</template>

<script setup lang="ts">
import UpArrowIcon from '../icons/UpArrowIcon.vue';
import DownArrowIcon from '../icons/DownArrowIcon.vue';

const props = defineProps<{
  sortable?: boolean,
  active?: boolean,
  asc?: boolean,
}>()

const emit = defineEmits(['sort']);
</script>

<style scoped>
th {
  padding: 0px;
}

.head-cell {
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  cursor: default;
}

.sortable {
  cursor: pointer;
}

.sortable .icon {
  visibility: hidden;
}

.sortable:hover .icon,
.active .icon {
  visibility: visible;
}

.sortable:hover,
.active {
  color: var(--table-header-active-text-color);
  background-color: var(--table-header-active-bg-color);
}
</style>