<template lang="pug">
VList(@keydown.down.stop.prevent="stepDown" @keydown.escape.stop.prevent="close" @keydown.up.stop.prevent="stepUp" @keypress.enter.stop.prevent="selectFocused" @keypress="onKeyDown" pos="relative" ref="element" flex-grow="1" h="10" frame="~ gray-400 hover:gray-300 on-frameless:none" :frameless="!hasFrame" justify="center")
  HList(w="full" px="4 md:3" items="center")
    SearchIcon(w="6" fill="gray-400")

    input(type="text" text="lt-md:base" v-model="searchTerm" :placeholder="placeholder ?? 'Search'" ref="searchElement" bg="gray-900 md:ix-black" @click.stop="isOpen = true" outline="none" px="2" w="full" size="3" @input="onChangeSearch")

  Transition(name="fade")
    SearchListContainer(v-if="isOpen" ref="scrollElement" w="full")

      template(v-if="searchHistoryVisible")
        HList(font="bold" px="4 md:3" py="2" b="b-0.5 gray-600" v-if="searchHistory.length >= 1") Recent searches:

        HList(font="bold" px="4 md:3" py="2" v-else) No recent searches.

        VList(v-for="(search, index) in searchHistory" :key="index")
          SearchItem(@click="onSelect(search)" :is-focused="isFocused(index)" @mouseenter="setFocusIndex(index)" @mouseleave="onLeave(index)")
            HList(space-x="3" items="center" w="full" flex-grow="1")
              SearchIcon(w="6")
              div() {{ search }}

              HList(flex-grow="1" justify="end")
                CloseIcon(w="3" @click="removeRecentSearch(search)" translate-y="-0.2")

      template(v-else)
        HList(font="bold" px="3" py="2" b="b-0.5 gray-600") Did you mean?

        VList.no-scrollbar(divide-y="0.5")
          SearchItem.no-scrollbar(:id="getId(index)" v-for="(item, index) in searchHits" @click="onSelect(item)" :is-focused="isFocused(index)" @mouseenter="setFocusIndex(index)" @mouseleave="onLeave(index)")
            slot(name="item" :item="item")
              div {{ item }}
</template>

<script setup lang="ts">
import SearchIcon from '~/assets/icons/search.svg'
import CloseIcon from '~/assets/icons/close.svg'

const element = shallowRef()
const searchElement = shallowRef()
const scrollElement = shallowRef()

const props = defineProps<{
  options: string[]
  placeholder?: string
  hasFrame?: boolean
}>()

const onSelect = (option: string | null) => {
  if (!option) {
    return finishedSearch(searchTerm.value ?? '')
  }

  searchTerm.value = option
  finishedSearch(option)
}

const onChangeSearch = () => {
  setSearchHits()
  emit("input", searchTerm.value)
}

// Leave be for now
// const onRecentSearchClick = (term: string) => {
//   console.log('Why tho?')
//   searchTerm.value = term
// }

const finishedSearch = (term: string) => {
  close()
  emit("selected", term)
  saveToHistory(term)
}
const computedOptions = computed(() => props.options)

const {
  stepDown,
  stepUp,
  onKeyDown,
  getId,
  close,
  onLeave,
  isFocused,
  setSearchHits,
  setFocusIndex,
  selectFocused,
  setupInitialList,
  searchHistory,
  searchHistoryVisible,
  isOpen,
  searchHits,
  searchTerm
} = useSearch(computedOptions, searchElement, scrollElement, onSelect)


const saveToHistory = (term: string) => {
  if (term == null)
    return

  const uniqueItems = searchHistory.value.filter(item => item !== term)

  searchHistory.value = [
    ...uniqueItems,
    term,
  ].slice(0, 5)
}

const removeRecentSearch = (search: string) => {
  searchHistory.value = searchHistory.value.filter(term => term !== search)
}

const emit = defineEmits(["selected", "input"])

onClickOutside(element, () => {
  isOpen.value = false
})

onMounted(() => {
  setupInitialList()
})

</script>