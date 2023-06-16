<template lang="pug">
OptionFilter(:filters="activeFilters" :large="true" @toggle="$emit('toggle-filter')")
  template(#icon)
    FilterIcon()

  template(#header)
    FilterIcon(w="6" translate-y="-0.4")
    span() FILTER

  template(#item)
    CollectionFilterSlideout(:items="data.filters" v-if="data?.filters")

</template>
  

<script lang="ts" setup>
import type { CollectionData } from '~/composables/useCollection';
import FilterIcon from '~/assets/icons/filter.svg'

const { activeFilters } = useCollectionSettings()

const { data } = defineProps<{
  data?: CollectionData
}>()

</script>