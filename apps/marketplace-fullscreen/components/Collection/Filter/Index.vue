<template lang="pug">
HList(py="3" pos="sticky top-16" space-x="3" bg="ix-black" z="2")
  Search(:options="items" :search-paths="['type', 'tier']" w="full")
    template(#item="{item}")
      HList(items="center" space-x="3")
        TokenImage(:token="item" w="12")
        TokenName(:token="item" capitalize="~")

  CollectionFilterToggleDisplay()

</template>

<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';

const props = defineProps<{
  items: CollectionItem[]
}>()

</script>



