<template lang="pug">
Transition(name="slide-left")
  HList(v-if="numberOfSelected" w="full" bg="ix-black" pos="sticky top-52 on-table:sticky top-30" z="3" px="0 on-open:3" flex-wrap="~" space-x="4" :open="isOpen" :active="isFilterActive" :table="isTable" gap="0.5" p="b-0 on-active:b-3")
    template(v-for="(item, filterIndex) in activeFilters")
      CollectionFilterButton(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value") {{ option.name }}

    CollectionFilterButtonClearAll(@click="clearFilters" v-if="moreThanOneSelected")

</template>

<script lang="ts" setup>

defineProps<{
  isOpen?: boolean
}>()

const { activeFilters, displayType } = useCollectionSettings()

const numberOfSelected = computed(() => {
  console.log("AEOIHFADSFOIH", activeFilters.value)
  return activeFilters.value.reduce((count, filter) => {
    return count + filter.value.filter(option => option.selected).length;
  }, 0);
});

const moreThanOneSelected = computed(() => {
  return numberOfSelected.value > 1;
});

const isFilterActive = computed(() => activeFilters.value.length > 1)

const isTable = computed(() => displayType.value == 'list')

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false;
    });
  });
};
</script>