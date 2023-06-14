<template lang="pug">
VList()
  ButtonSquareIcon(display="lt-md:none" @click="$emit('toggle')" w="10 on-lg:12" :lg="large")
    span(w="6" :lg="large")
      slot(name="icon")

  ButtonSquareIcon(display="md:none" @click="toggleTakeOver" w="10 on-lg:12" :lg="large")
    span(w="6" :lg="large")
      slot(name="icon")



    Teleport(to="#takeover")
      Transition(name="slide-bottom")
        OptionPanel.no-scrollbar(@close="showTakeOver = false" v-if="showTakeOver")
          template(#iconheader?)
            slot(name="iconheader")

          template(#header) 
            slot(name="header")

          template(#default)
            slot(name="item")

          template(#buttons)
            div(grid="~ cols-2" display="md:none")
              button(btn="secondary on-disabled:disabled" :disabled="lessThanOneSelected" @click="clearFilters") clear all
              button(btn="primary on-disabled:disabled" @click="showTakeOver = false" :disabled="lessThanOneSelected") apply filter

</template>

<script lang="ts" setup generic="T extends object | string">
defineProps<{
  filters?: T[] | undefined | null
  large?: boolean
}>()

const { activeFilters } = useCollectionSettings()

const numberOfSelected = computed(() => {
  return activeFilters.value.reduce((count, filter) => {
    return count + filter.value.filter(option => option.selected).length;
  }, 0);
});

const lessThanOneSelected = computed(() => {
  return numberOfSelected.value < 1;
});

const showTakeOver = ref(false)

const toggleTakeOver = () => {
  showTakeOver.value = !showTakeOver.value
}

const clearFilters = () => {
  activeFilters.value.forEach(filter => {
    filter.value.forEach(option => {
      option.selected = false;
    });
  });
};
</script>