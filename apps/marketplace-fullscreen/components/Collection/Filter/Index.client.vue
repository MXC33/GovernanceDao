<template lang="pug">
HList(w="full" pos="sticky top-34" z="4")
  HList(w="full" py="3" space-x="3" bg="ix-black")

    CollectionFilterToggleFilter(@click="$emit('toggleFilter')")

    Search(:options="items" :search-paths="['name']" w="full")
      template(#item="{item}")
        HList(items="center" space-x="3")
          div(w="12")
            TokenImage(:token="item"  :key="'img' + getTokenKey(item)")

          TokenName(:token="item" capitalize="~" :key="'name' + getTokenKey(item)")

    CollectionFilterToggleDisplay(v-if="!hideToggle")
    
</template>

<script lang="ts" setup>
import type { IXToken } from '@ix/base/composables/Token/useIXToken';

const { getTokenKey } = useTokens()
defineProps<{
  items: IXToken[],
  filters: any[],
  hideToggle?: boolean
}>()

defineEmits<{
  toggleFilter: []
}>()

</script>



