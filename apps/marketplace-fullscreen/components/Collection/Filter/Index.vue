<template lang="pug">
HList(w="full" pos="sticky top-34" z="2")
  HList(w="full" py="3" space-x="3" bg="ix-black")

    CollectionFilterToggleFilter(@click="$emit('toggle-filter')")

    Search(:options="items" :search-paths="['type', 'tier']" w="full")
      template(#item="{item}")
        HList(items="center" space-x="3")
          div(w="12")
            TokenImage(:token="item"  :key="'img' + getTokenKey(item)")

          TokenName(:token="item" capitalize="~" :key="'name' + getTokenKey(item)")

    CollectionFilterToggleDisplay()
    
</template>

<script lang="ts" setup>
import type { CollectionItem } from '~/composables/useCollection';
const { getTokenKey } = useTokens()
defineProps<{
  items: CollectionItem[]
}>()

</script>



