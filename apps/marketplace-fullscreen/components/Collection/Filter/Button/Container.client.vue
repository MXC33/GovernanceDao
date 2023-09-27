<template lang="pug">
Transition(name="slide-left")
  HList(v-if="numberOfSelected" flex-wrap="~" gap="3" p="l-4 on-active:(b-4 md:b-3)" w="md:full" bg="ix-black" z="3" whitespace="nowrap" :open="isOpen" :active="isFilterActive" transition="all")
    template(v-for="(item, filterIndex) in selectedFilters")
      template(v-for="(option, index) in item.value")
        CollectionFilterButton(v-if="option.selected" @clear="clearFilter(filterIndex, index)")
          template(#category) {{ item.trait_type }}:
          template(#type) {{ option.name }}

    CollectionFilterButtonClearAll(@clearfilter="clearFilters" v-if="moreThanOneSelected")

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

const selectedFilters = computed(() => {
  return activeFilters.value
    .map((filter, index) => {
      const selectedOptions = filter.value
        .map((option, optionIndex) => option.selected ? { ...option, originalIndex: optionIndex } : null)
        .filter(option => option !== null) as { originalIndex: number, name: string, selected: boolean }[]

      return {
        originalIndex: index,
        trait_type: filter.trait_type,
        value: selectedOptions
      }
    })
    .filter(filter => filter.value.length > 0)
})

const clearFilter = (filterIndex: number, optionIndex: number) => {
  const originalFilterIndex = selectedFilters.value[filterIndex].originalIndex
  const originalOptionIndex = selectedFilters.value[filterIndex].value[optionIndex].originalIndex
  activeFilters.value[originalFilterIndex].value[originalOptionIndex].selected = false
}

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false
    })
  })
}
</script>