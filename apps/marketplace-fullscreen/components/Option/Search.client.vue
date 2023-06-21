<template lang="pug">
VList(flex-grow="md:1" w="md:full")
  Search(:options="autocompleteResults"  @selected="selectedSearch"  @input="updateSearchString" display="lt-md:none" :has-frame="true")
    template(#item="{item}") {{ item }}

  ButtonSquareIcon(display="md:none" @click="toggleTakeOver" w="10 on-lg:22" :lg="large")
    span(w="6" :lg="large")
      slot(name="icon")

    Teleport(to="#takeover")
      Transition(name="slide-bottom")
        OptionPanel(@close="showTakeOver = false" v-if="showTakeOver" :is-search="true")

          template(#search)
            Search(:options="autocompleteResults" @selected="selectedSearch" @input="updateSearchString" display="md:none" w="full" :has-frame="false")
              template(#item="{item}") {{ item }}

</template>

<script lang="ts" setup generic="T extends object | string">
import type { CollectionResponse } from '~/composables/api/post/useCollectionAPI';
import type { CollectionData, } from '~/composables/useCollection'

const { activeSearchTerm } = useCollectionSettings()

const route = useRoute()
const { contract } = route.params
const { getCollectionURL } = useCollectionsURL()

const { fetchIXAPI } = useIXAPI()
const autocompleteResults = shallowRef<string[]>([])
const autocompleteSearch = shallowRef<string>('')

const searchFetch = async (term: string) => {
  const collection = await fetchIXAPI(getCollectionURL(String(contract), 'polygon'), 'POST', {
    filter: {
      owned: false,
      type: 0,
      search: term
    }
  }) as CollectionResponse

  const { data: { nfts } } = collection
  const newData = nfts?.filter(item => item.name).map((item) => item.name) ?? []
  autocompleteResults.value = autocompleteResults.value
    .concat(newData)
    .filter((val, index, array) => array.indexOf(val) == index)

}

onBeforeMount(() => {
  searchFetch("")
})

const updateSearchString = (term: string) => {
  autocompleteSearch.value = term
}

watchDebounced(autocompleteSearch, (newValue) => {
  searchFetch(newValue)
}, { debounce: 500 })

const showTakeOver = ref(false)

const toggleTakeOver = () => {
  showTakeOver.value = !showTakeOver.value
}

const selectedSearch = (newSearchTerm: string) => {
  activeSearchTerm.value = newSearchTerm
}


defineProps<{
  large?: boolean
  data?: CollectionData
}>()

</script>