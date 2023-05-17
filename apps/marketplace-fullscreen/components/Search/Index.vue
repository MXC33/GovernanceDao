<template lang="pug">
VList(@keydown.down.stop.prevent="stepDown" @keydown.up.stop.prevent="stepUp" @keypress.enter.stop.prevent="selectFocused" @keypress="onKeyDown" pos="relative" frame="~")
  HList()
    SearchIcon
    input(type="text" v-model="searchTerm" :placeholder="placeholder ?? 'search'" ref="searchElement" bg="ix-black" @click.stop="isOpen = true" outline="none" p="3")

  Transition(name="fade")
    SearchListContainer(v-if="isOpen" ref="scrollElement" pos="absolute" bg="gray-900")
      template(v-if="list.length == 0")
        div(p="2" bg="gray-300 opacity-20" rounded="md" opacity="50" cursor="default") {{ $t('general.noListOptions') }}

      template(v-else)
        VList(v-for="(group, groupIndex) in list" space-y="2")
          SearchCategory(v-if="group.category") {{ group.category }}

          SearchItem(v-for="(option, index) in group.items" @click="onSelect(option)" :selected="isSelected(option)" :is-focused="isFocused({groupIndex, index})" @mouseenter="focus(groupIndex, index)" @mouseleave="onLeave({groupIndex, index})") 
            slot(name="item")

</template>
  
  
<script setup lang="ts" generic="Item extends Record<string, any>, Key extends keyof Item & string">

import SearchIcon from '~/assets/icons/search.svg'

const searchElement = ref()
const scrollElement = ref()
const focusIndex = ref<Focus | null>({ groupIndex: 0, index: 0 })
const isOpen = ref(false)

const props = defineProps<{
  options: Readonly<Item[]>,
  searchPaths: Key[],
  selected?: Item,
  placeholder?: string,
}>()

interface Focus {
  groupIndex: number,
  index: number
}

const onLeave = (item: Focus) => {
  if (isFocused(item))
    focusIndex.value = null
}

const isFocused = (item: Focus) =>
  item.groupIndex == focusIndex.value?.groupIndex &&
  item.index == focusIndex.value?.index

const searchTerm = ref("")

interface GroupedItem {
  category?: string;
  items: Item[];
}

const groupList = (items: Readonly<Item[]>): GroupedItem[] => {
  const groupedList: Record<string, Item[]> = groupBy(items, 'category')

  return Object.keys(groupedList).map((key) => ({
    category: key == 'undefined' ? undefined : key,
    items: groupedList[key].filter((item) => {
      return item.value != ""
    })
  }))
}

const getStartPosition = (): Focus => {
  return {
    index: 0,
    groupIndex: 0
  }
}

const focus = (groupIndex: number, index: number) => {
  setFocusIndex({ groupIndex, index })
}

const list = computed(() => {
  const list = props.options
  const search = searchTerm.value.trim()
  const grouped = groupList(list)

  if (search == "")
    return grouped

  const listWithHits = list.filter(fuzzy(search, {
    iterator: (item: Item) => joinItemValues(item)
  }))

  return groupList(listWithHits)
})

const joinItemValues = (item: Item) =>
  props.searchPaths.map((prop) => item[prop]).join(' ')

const clamp = (n: number, max: number, min: number = 0) =>
  Math.max(min, Math.min(max, n))

watch(list, (list) => {
  nextTick(() => {
    setupInitialList()
  })
})

onMounted(() => {
  setupInitialList()
})

const setupInitialList = () => {
  setFocusIndex(getStartPosition())
}

const groupSize = computed(() => list.value?.length ?? 0)

const setFocusIndex = (focus: Focus) => {
  const groupIndex = clamp(focus.groupIndex, groupSize.value - 1)
  const index = clamp(focus.index, list.value[groupIndex]?.items?.length - 1 ?? 0)

  focusIndex.value = { groupIndex, index }
}

const selectFocused = () => {
  if (focusIndex.value == null)
    return

  const { groupIndex, index } = focusIndex.value
  onSelect(list.value[groupIndex].items[index])
}

const currentList = computed(() => {
  if (!focusIndex.value)
    return null

  return list.value[focusIndex.value.groupIndex]
})

const getFocusBase = (): Focus => {
  const index = focusIndex.value?.index ?? 0
  const groupIndex = focusIndex.value?.groupIndex ?? 0
  return { index, groupIndex }
}

const stepDown = () => {
  const { index, groupIndex } = getFocusBase()
  const newIndex = index + 1
  const currentGroupSize = currentList.value?.items?.length ?? 0
  const selectFirstGroup = groupIndex + 1 >= groupSize.value

  if (newIndex >= currentGroupSize)
    return setFocusIndex({
      groupIndex: selectFirstGroup ? 0 : groupIndex + 1,
      index: 0
    })

  setFocusIndex({ groupIndex, index: newIndex })
}

const stepUp = () => {
  const { index, groupIndex } = getFocusBase()
  const newIndex = index - 1
  const selectLastGroup = groupIndex - 1 < 0

  if (newIndex < 0) {
    const newGroup = selectLastGroup ? groupSize.value - 1 : groupIndex - 1
    const index = selectLastGroup ? Infinity : (groupIndex == 0 ? 0 : Infinity)
    return setFocusIndex({
      groupIndex: newGroup,
      index
    })
  }

  setFocusIndex({ groupIndex, index: newIndex })
}

const onKeyDown = (ev: KeyboardEvent) => {
  const skipCharacters = ["Shift", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Meta", "Alt", "Control"]
  if (skipCharacters.includes(ev.key))
    return

  searchElement.value?.focusElement()
}

const emit = defineEmits(["selected"])

const onSelect = (option: Item) => {
  emit("selected", option)
}


const isSelected = (option: Item) =>
  props.selected && joinItemValues(props.selected) == joinItemValues(option)

</script>