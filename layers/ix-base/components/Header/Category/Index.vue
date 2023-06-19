<template lang="pug">
div()
  div(text="gray-200" p="2") {{ $t(`marketplace.navigation.${parentType}.${category.type}.title`) }} 
  div(b="b-1 gray-400" w="95%")

  div(grid="~ cols-1 s-two:cols-2 s-three:cols-3" :state="gridState" )
    HeaderCategoryItem(v-for="item in category.items" :header="parentType" :category="category.type" :item="item" @click="onClickItem(parentType, category.type, item)" items="center") 

</template>

<script lang="ts" setup>
import type { HeaderCategory } from '~/composables/useSiteHeader';
const { enable } = useIXTSwapVisible()
const props = defineProps<{
  parentType: string,
  category: HeaderCategory
}>()

const emit = defineEmits(["onClickItem"])

const onClickItem = (type: string, catagory: string, item: string) => {
  //console.log("OnClicked Header category index", type, catagory, item)
  emit('onClickItem', type, catagory, item)

  switch (item) {
    case 'swap':
      enable()
      break
  }
}

const gridState = computed(() => {
  const gridItems = props.category.items.length
  if (gridItems > 6)
    return 'three'

  if (gridItems > 3)
    return 'two'
})

</script>