<template lang="pug">
HList(uppercase="~" mt="2" font="bold" text="white" p="1")
  CollectionHeaderToggleDisplayButton(:active="displayType == 'grid'" @click="displayType = 'grid'")
    GridIcon(w="8")

  CollectionHeaderToggleDisplayButton(:active="displayType == 'list'" @click="displayType = 'list'")
    ListIcon(w="8") 

</template>
  

<script lang="ts" setup>
import GridIcon from '~/assets/icons/grid.svg'
import ListIcon from '~/assets/icons/list.svg'

const { displayType, toggleDisplayType } = useCollectionSettings()

</script>