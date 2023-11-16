<template lang="pug">
Teleport(to="#takeover")
  Transition(name="slide-bottom")
    OptionPanel.no-scrollbar(@close="isOpen = false" v-if="isOpen")

      template(#icon)
        FilterIcon()

      template(#header)
        FilterIcon(w="6" translate-y="-0.4")
        span() {{ $t('collection.filter.mobile.filter') }}

      template(#default)
        CollectionFilterSlideout(:items="filters" v-if="filters")

      template(#buttons)
        div(grid="~ cols-2" display="md:none")
          button(btn="~ secondary on-disabled:disabled" :disabled="lessThanOneSelected" @click="clearFilters") {{ $t('collection.filter.mobile.clearAll') }}
          button(btn="~ primary on-disabled:disabled" @click="isOpen = false" :disabled="lessThanOneSelected") {{ $t('collection.filter.mobile.applyFilter') }}

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
