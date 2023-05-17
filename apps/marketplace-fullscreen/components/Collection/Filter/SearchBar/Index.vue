<template lang="pug">
HList(h="12" frame="~" space-x="3" px="3" min-w="0" flex-grow="1")
  SearchIcon(w="4") 
  //- input(text="lg" placeholder="search" w="full" outline="none" bg="transparent" flex-grow="1" h="full")
</template>



<script lang="ts" setup>
import SearchIcon from '~/assets/icons/search.svg'

const searchOptions = computed(() => {

})
</script>