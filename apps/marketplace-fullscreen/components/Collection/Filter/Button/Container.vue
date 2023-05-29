<template lang="pug">
ClientOnly
  HList(w="full" bg="ix-black" pos="sticky top-52" z="3" px="0 on-open:3" flex-wrap="~" pb="3" space-x="4" :open="isOpen" gap="0.5")
    template(v-for="(item, filterIndex) in activeFilters")
      CollectionFilterButton(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value") {{ option.name }}

    CollectionFilterButtonClearAll(@clear="clearFilters" v-if="isAnyFilterSelected")

</template>

<script lang="ts" setup>

defineProps<{
  isOpen: boolean
}>()

const { activeFilters } = useCollectionSettings()

const isAnyFilterSelected = computed(() => {
  return activeFilters.value.some(filter => filter.value.some(option => option.selected));
});

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false;
    });
  });
};
</script>