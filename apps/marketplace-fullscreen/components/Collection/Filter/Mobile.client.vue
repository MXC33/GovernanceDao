<template lang="pug">
Teleport(to="#takeover")
  Transition(name="slide-bottom")
    OptionPanel.no-scrollbar(@close="isOpen = false" v-if="isOpen")

      template(#icon)
        FilterIcon()

      template(#header)
        FilterIcon(w="6" translate-y="-0.4")
        span() FILTER

      template(#default)
        CollectionFilterSlideout(:items="filters" v-if="filters")

      template(#buttons)
        div(grid="~ cols-2" display="md:none")
          button(btn="~ secondary on-disabled:disabled" :disabled="lessThanOneSelected" @click="clearFilters") clear all
          button(btn="~ primary on-disabled:disabled" @click="isOpen = false" :disabled="lessThanOneSelected") apply filter

</template>

<script lang="ts" setup>
import FilterIcon from '~/assets/icons/filter.svg'
import type { APIFilter } from '~/composables/useCollection';

const { activeFilters } = useCollectionSettings()

defineProps<{
  filters?: APIFilter[]
}>()

const isOpen = defineModel<boolean>()

const numberOfSelected = computed(() => {
  return activeFilters.value.reduce((count, filter) => {
    return count + filter.value.filter(option => option.selected).length;
  }, 0);
});

const lessThanOneSelected = computed(() => {
  return numberOfSelected.value < 1
})

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false
    })
  })
}
</script>