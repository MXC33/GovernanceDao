<template lang="pug">
Transition(name="slide-left")
  HList(v-if="numberOfSelected" flex-wrap="~" gap="3" p="l-4 r-4 md:l-0 r-0 on-active:b-4 md:b-3" w="md:full" mx="lt-md:(-4)" bg="ix-black" z="99" px="0 on-open:3" whitespace="nowrap" :open="isOpen" :active="isFilterActive")
    template(v-for="(item, filterIndex) in activeFilters")
      CollectionFilterButton(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value")
        template(#category) {{ item.trait_type }}:
        template(#type) {{ option.name }}

    CollectionFilterButtonClearAll(@click="clearFilters" v-if="moreThanOneSelected")

</template>

<script lang="ts" setup>

defineProps<{
  isOpen?: boolean
}>()

const { activeFilters } = useCollectionSettings()


const numberOfSelected = computed(() => {
  return activeFilters.value.reduce((count, filter) => {
    return count + filter.value.filter(option => option.selected).length
  }, 0)
})

const moreThanOneSelected = computed(() => {
  return numberOfSelected.value > 1
})

const isFilterActive = computed(() => activeFilters.value.length > 1)

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false
    });
  });
};
</script>