<template lang="pug">
Transition(name="slide-left")
  HList(w="full" bg="ix-black" pos="sticky top-52" z="3" px="0 on-open:3" flex-wrap="~" space-x="4" :open="isOpen" gap="0.5" p="2 md:b-4")
    template(v-for="(item, filterIndex) in activeFilters")
      CollectionFilterButton(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value") {{ option.name }}

    CollectionFilterButtonClearAll(@click="clearFilters" v-if="moreThanOneSelected")

</template>

<script lang="ts" setup>

defineProps<{
  isOpen: boolean
}>()

const { activeFilters } = useCollectionSettings()

const numberOfSelected = computed(() => {
  return activeFilters.value.reduce((count, filter) => {
    return count + filter.value.filter(option => option.selected).length;
  }, 0);
});

const moreThanOneSelected = computed(() => {
  return numberOfSelected.value > 1;
});

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false;
    });
  });
};
</script>