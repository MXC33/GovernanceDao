import { get, MaybeRef, MaybeComputedElementRef, unrefElement } from '@vueuse/core'
import { filter as fuzzy } from 'fuzzyjs'
import { ref } from 'vue'


export const useSearch = (items: Readonly<MaybeRef<string[]>>, searchElement: MaybeComputedElementRef, scrollElement: MaybeComputedElementRef, onSelect: (element: string | null) => void) => {
  const focusIndex = shallowRef<number | null>(null)
  const selectedItem = shallowRef<string | null>(null)
  const searchHits = shallowRef<string[]>([])
  const searchHistory = useCookieState<string[]>('search-history', () => [], { consentLevel: "preferences" })
  const searchHistoryVisible = shallowRef(false)
  const isOpen = shallowRef(false)
  const searchTerm = shallowRef<string | null>("")

  const getId = (index: number) =>
    `search-list-${index}`

  const onLeave = (item: number) => {
    if (isFocused(item))
      focusIndex.value = null
  }

  const isFocused = (item: number) =>
    item == focusIndex.value

  const close = () => {
    isOpen.value = false
    const el = unrefElement(searchElement) as HTMLElement
    el?.blur()
  }

  const scrollToItem = (item: number) => {
    const id = getId(item)
    const element = document.getElementById(id)
    const scrollEl = unrefElement(scrollElement) as HTMLElement

    if (!scrollEl || !element)
      return

    scrollParentToChild(scrollEl, element)
  }

  const setSearchHits = () => {
    const list = get(items)
    const search = searchTerm.value?.trim()

    if (search == "" || !search) {
      return searchHistoryVisible.value = true
    }

    const listWithHits = list.filter(fuzzy(search, {
      iterator: (value: string) => {
        const newval = value + ' ' + value.replaceAll('0', 'o').replaceAll('3', 'e').replaceAll('-', ' ').replaceAll('biomod', 'bio mod')
        return newval
      }
    }))
    console.log("Get hits", search, listWithHits, list)

    searchHistoryVisible.value = false
    searchHits.value = (listWithHits)
  }

  const clamp = (n: number, max: number, min: number = 0) =>
    Math.max(min, Math.min(max, n))

  const setupInitialList = () => {
    searchHistoryVisible.value = true
  }

  const setFocusIndex = (index: number, scroll: boolean = false) => {
    const clampedIndex = clamp(index, lookupList.value.length - 1 ?? 0)

    focusIndex.value = clampedIndex

    if (scroll)
      scrollToItem(focusIndex.value)

    console.log("item", focusedItem.value, focusIndex.value)

    if (focusedItem.value)
      searchTerm.value = focusedItem.value
  }

  const focusedItem = computed(() => {
    if (focusIndex.value == null)
      return null

    const index = focusIndex.value

    return lookupList.value[index]
  })

  const selectFocused = () => {
    if (focusIndex.value == null)
      return onSelect(null)

    if (!lookupList.value.length)
      return onSelect(null)

    onSelect(lookupList.value[focusIndex.value])
  }

  const lookupList = computed(() => searchHistoryVisible.value ? searchHistory.value : searchHits.value)

  const stepDown = () => {
    const index = focusIndex.value ?? 0
    const newIndex = index + 1
    const currentSize = lookupList.value?.length ?? 0

    if (newIndex >= currentSize)
      return setFocusIndex(0)

    setFocusIndex(newIndex, true)
  }

  const stepUp = () => {
    const index = focusIndex.value ?? 0
    const newIndex = index - 1

    if (newIndex < 0) {
      return setFocusIndex(lookupList.value.length - 1)
    }

    setFocusIndex(newIndex, true)
  }

  const onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key == 'Escape')
      return close()

    const skipCharacters = ["Shift", "Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Meta", "Alt", "Control"]
    if (skipCharacters.includes(ev.key))
      return

    unrefElement(searchElement)?.focus()

  }

  const isSelected = (option: string) => {
    const item = selectedItem.value

    if (!item)
      return

    return item == option
  }

  return {
    setSearchHits,
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
    searchHistoryVisible,
    searchHistory,
    focusedItem,
    searchHits,
    searchTerm,
    isOpen
  }
}