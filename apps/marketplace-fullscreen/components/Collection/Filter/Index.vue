<!-- <script lang="ts" setup>
const showFilter = ref(false);

const toggleFilterBar = () => {
  showFilter.value = !showFilter.value
  console.log("toggleFilterBar");
}
</script> -->
<script lang="ts" setup>
const toggleFilterBar = () => {
  emit('toggleFilter')
  console.log("toggleFilterBar");
}
const emit = defineEmits(['toggleFilter']);
</script>

<template lang="pug">
HList(w="full" pos="sticky top-34" z="2")
  HList(w="full" py="3" space-x="3" bg="ix-black")
    //- CollectionFilterToggleFilter(@toggleFilter="toggleFilterBar" )
    CollectionFilterToggleFilter(@toggleFilter="toggleFilterBar" )
    CollectionFilterSearchBar()
    CollectionFilterToggleDisplay()
    
</template>


