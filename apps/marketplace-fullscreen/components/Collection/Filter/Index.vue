<template lang="pug">
HList(py="3" pos="sticky top-16" space-x="3" bg="ix-black" z="2")
  Search(:options="searchOptions")
  CollectionFilterToggleDisplay()

</template>

<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';

const props = defineProps<{
  items: CollectionItem[]
}>()

const searchOptions = computed(() => props.items.map((item) => ({
  value: item.type + item.tier,
  name: item.type
})))
</script>



