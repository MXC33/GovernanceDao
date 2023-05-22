import { get, MaybeRef, MaybeComputedElementRef, unrefElement } from '@vueuse/core'

import { ref } from 'vue'
import { filter as fuzzy } from 'fuzzyjs'

export interface Focus {
  groupIndex: number,
  index: number
}

export const useSearch = <Item extends Record<string, any>, Key extends string & keyof Item>(items: Readonly<MaybeRef<Item[]>>, searchPaths: Key[], searchElement: MaybeComputedElementRef, scrollElement: MaybeComputedElementRef, onSelect: (element: Item) => void) => {

  interface GroupedItem {
    category?: string;
    items: Item[];
  }

  const focusIndex = ref<Focus | null>({ groupIndex: 0, index: 0 })
  const selectedItem = shallowRef<Item | null>(null)
  const isOpen = ref(false)

  const searchTerm = ref<string | null>("")
  const getId = (groupIndex: number, index: number) =>
    `search-list-${groupIndex}-${index}`


  const onLeave = (item: Focus) => {
    if (isFocused(item))
      focusIndex.value = null
  }

  const isFocused = (item: Focus) => {
    const focused = item.groupIndex ==
      focusIndex.value?.groupIndex &&
      item.index == focusIndex.value?.index

    return focused
  }

  const close = () => {
    isOpen.value = false
    searchTerm.value = null
    const el = unrefElement(searchElement) as HTMLElement
    el?.blur()
  }

  const scrollToItem = (item: Focus) => {
    const id = getId(item.groupIndex, item.index)
    const element = document.getElementById(id)
    const scrollEl = unrefElement(scrollElement) as HTMLElement

    if (!scrollEl || !element)
      return

    scrollParentToChild(scrollEl, element)
  }

  const groupList = (items: Readonly<Item[]>): GroupedItem[] => {
    if (!items)
      return items

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

  const searchHits = computed(() => {
    const list = get(items)
    const search = searchTerm.value?.trim()
    const grouped = groupList(list)

    if (search == "" || !search)
      return grouped

    const listWithHits = list.filter(fuzzy(search, {
      iterator: (item: Item) => {
        const value = joinItemValues(item)

        const newval = value + ' ' + value.replaceAll('0', 'o').replaceAll('3', 'e').replaceAll('-', ' ')


        return newval
      }
    }))

    return groupList(listWithHits)
  })

  const joinItemValues = (item: Item) =>
    searchPaths.map((prop) => item[prop]).join(' ')

  const clamp = (n: number, max: number, min: number = 0) =>
    Math.max(min, Math.min(max, n))

  const setupInitialList = () =>
    setFocusIndex(getStartPosition())

  const groupSize = computed(() => searchHits.value?.length ?? 0)

  const setFocusIndex = (focus: Focus, scroll: boolean = false) => {
    const groupIndex = clamp(focus.groupIndex, groupSize.value - 1)
    const index = clamp(focus.index, searchHits.value[groupIndex]?.items?.length - 1 ?? 0)


    focusIndex.value = { groupIndex, index }
    if (scroll)
      scrollToItem(focus)
  }

  const selectFocused = () => {
    if (focusIndex.value == null)
      return

    const { groupIndex, index } = focusIndex.value

    onSelect(searchHits.value[groupIndex].items[index])
  }

  const currentList = computed(() => {
    if (!focusIndex.value)
      return null

    return searchHits.value[focusIndex.value.groupIndex]
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

    setFocusIndex({ groupIndex, index: newIndex }, true)
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

    setFocusIndex({ groupIndex, index: newIndex }, true)
  }

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key == 'Escape')
      return close()

    const skipCharacters = ["Shift", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Meta", "Alt", "Control"]
    if (skipCharacters.includes(ev.key))
      return

    unrefElement(searchElement)?.focus()
  }


  const isSelected = (option: Item) => {
    const item = selectedItem.value

    if (!item)
      return

    return joinItemValues(item) == joinItemValues(option)
  }

  return {
    selectFocused,
    setFocusIndex,
    setupInitialList,
    onKeyDown,
    stepDown,
    stepUp,
    isSelected,
    isFocused,
    getId,
    onLeave,
    close,
    searchHits,
    searchTerm,
    isOpen
  }
}