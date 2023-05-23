<template lang="pug">
HList(uppercase="~" font="bold" text="white" frame="~" flex-shrink="0" w="24")
  CollectionFilterToggleDisplayButton(:active="displayType == 'grid'" @click="displayType = 'grid'")
    GridIcon(w="6")

  CollectionFilterToggleDisplayButton(:active="displayType == 'list'" @click="displayType = 'list'")
    ListIcon(w="6") 

</template>

<script lang="ts" setup>
import GridIcon from '~/assets/icons/grid.svg'
import ListIcon from '~/assets/icons/list.svg'

const { displayType } = useCollectionSettings()

</script>