<template lang="pug">
ClientOnly
  HList(w="full" bg="ix-black" pos="sticky top-52" z="3" px="0 on-open:3" flex-wrap="~" pb="3" space-x="4" :open="isOpen" gap="0.5")
    template(v-for="(item, filterIndex) in activeFilters")
      CollectionFilterButton(v-model="activeFilters[filterIndex].value[index].selected" v-for="(option, index) in item.value" v-if="isSelected") {{ option.name }}

    CollectionFilterButtonClearAll(v-if="isSelected")

</template>

<script lang="ts" setup>

defineProps<{
  isOpen: boolean
}>()

const { activeFilters } = useCollectionSettings()

const filterValue = computed(() => activeFilters.value.flatMap(item => item.value))

const isSelected = computed(() => filterValue.value.map(item => item.selected))


</script>