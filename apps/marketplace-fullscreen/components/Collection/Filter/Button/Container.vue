<template lang="pug">
ClientOnly
  Transition(name="fade-slow" mode="in-out")
    HList(w="full" bg="ix-black" pos="sticky top-52" z="3" px="0 on-open:3" flex-wrap="~" pb="3" space-x="4" :open="isOpen" gap="0.5")
      template(v-for="(value, index) in filterValue")
        CollectionFilterButton(v-if="value.selected") {{ value.name }}
        CollectionFilterButtonClearAll(v-if="value.selected")

</template>

<script lang="ts" setup>
const isActive = ref<boolean>(false)

defineProps<{
  isOpen: boolean
}>()

const { activeFilters } = useCollectionSettings()

const filterValue = computed(() => activeFilters.value.flatMap(item => item.value))



</script>