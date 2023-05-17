<template lang="pug">
HList(uppercase="~" font="bold" text="white" frame="~" flex-shrink="0" w="12" h="12" items="center" justify="center")
  CollectionFilterToggleFilterButton()
    FilterIcon(w="5")

//- ContentDrawerWrapper(v-if="")
</template>
  

<script lang="ts" setup>
import FilterIcon from '~/assets/icons/filter.svg'

const { displayType, toggleDisplayType } = useCollectionSettings()

</script>