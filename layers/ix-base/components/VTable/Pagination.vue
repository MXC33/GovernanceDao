<template lang="pug">
HList.pagination
  span Rows per page

  select(:value="props.perPage", @change="onSelectChange")
    option(value="5") 5
    option(value="10") 10
    option(value="25") 25
    option(value="50") 50
    option(value="0") All

  button(type="button", :disabled="props.currentPage <= 1", @click="emit('prevpage')") Prev

  div {{ props.currentPage}} of {{ props.totalPages }}

  button(type="button", :disabled="props.currentPage >= props.totalPages", @click="emit('nextpage')") Next
</template>

<script setup lang="ts">
const emit = defineEmits(['prevpage', 'nextpage', 'perpage'])

const props = defineProps<{
  perPage: number,
  currentPage: number,
  totalPages: number
}>()

const onSelectChange = (e: Event) => {
  //@ts-ignore
  emit('perpage', parseInt(e?.target?.value, 10));
}

</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background-color: var(--table-header-bg-color);
  color: var(--table-header-text-color);
  border-top: 1px solid var(--table-border-color);
}

button,
select {
  background-color: var(--table-header-active-bg-color);
  color: var(--table-header-active-text-color);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover:not(:disabled),
select:hover {
  background-color: var(--button-hover-bg-color);
  color: var(--button-hover-text-color);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>