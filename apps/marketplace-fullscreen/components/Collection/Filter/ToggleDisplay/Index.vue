<template lang="pug">
HList(uppercase="~" font="bold" text="white" frame="~ hover:gray-300" flex-shrink="0" min-w="24" min-h="12")
  CollectionFilterToggleDisplayButton(:active="displayType == 'grid'" @click="displayType = 'grid'")
    GridIcon(w="5 md:6")

  CollectionFilterToggleDisplayButton(:active="displayType == 'list'" @click="displayType = 'list'")
    ListIcon(w="5 md:6") 

</template>

<script lang="ts" setup>
import GridIcon from '~/assets/icons/grid.svg'
import ListIcon from '~/assets/icons/list.svg'

const { displayType } = useCollectionSettings()

</script>