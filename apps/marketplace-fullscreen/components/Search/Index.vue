<template lang="pug">
VList(@keydown.down.stop.prevent="stepDown" @keydown.up.stop.prevent="stepUp" @keypress.enter.stop.prevent="selectFocused" @keypress="onKeyDown" pos="relative" frame="~ hover:gray-300" ref="element")
  HList(w="full" px="3" h="full")
    SearchIcon(w="4")

    input(type="text" v-model="searchTerm" :placeholder="placeholder ?? 'Search'" ref="searchElement" bg="ix-black" @click.stop="isOpen = true" outline="none" p="3" w="full" size="3")

  Transition(name="fade")
    SearchListContainer(v-if="isOpen" ref="scrollElement" w="full")
      template(v-if="searchHits.length == 0")
        div(p="2" bg="gray-300 opacity-20" rounded="md" opacity="50" cursor="default") {{ $t(`collection.nothingFound`) }}

      template(v-else)
        VList(v-for="(group, groupIndex) in searchHits" space-y="2")
          SearchCategory(v-if="group.category") {{ group.category }}

          SearchItem(:id="getId(groupIndex, index)" v-for="(item, index) in group.items" @click="onSelect(item)" :selected="isSelected(item)" :is-focused="isFocused({groupIndex, index})" @mouseenter="setFocusIndex({groupIndex, index})" @mouseleave="onLeave({groupIndex, index})") 
            slot(name="item" :item="item")
              div {{ item[searchPaths[0]] }}

</template>
  
  
<script setup lang="ts" generic="Item extends Record<string, any>, Key extends keyof Item & string">

import SearchIcon from '~/assets/icons/search.svg'

const element = ref()
const searchElement = ref()
const scrollElement = ref()
const props = defineProps<{
  options: Readonly<Item[]>,
  searchPaths: Key[],
  selected?: Item,
  placeholder?: string,
}>()


const onSelect = (option: Item) => {

  navigateTo(`/assets/${option.network}/${option.collection}/${option.token_id}`)

  close()
  emit("selected", option)
}

const {
  setupInitialList,
  stepDown,
  stepUp,
  onKeyDown,
  getId,
  close,
  onLeave,
  isFocused,
  isSelected,
  setFocusIndex,
  selectFocused,
  isOpen,
  searchHits,
  searchTerm
} = useSearch<Item, Key>(props.options, props.searchPaths, searchElement, scrollElement, onSelect)

const emit = defineEmits(["selected"])

onClickOutside(element, () => {
  isOpen.value = false
})

watch(searchHits, () => {
  nextTick(() => {
    setupInitialList()
  })
})

onMounted(() => {
  setupInitialList()
})


</script>