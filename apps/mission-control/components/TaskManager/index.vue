<template lang="pug">
ListContainer()
  SlideoutSubmenuWrapper(:sub-menu-open="!!selectedCorporation")
    template(#default) 
      TaskManagerSelect()

    template(#sub-menu)
      TaskManagerCorporation()

</template>

<script setup lang="ts">
const { selectedCorporation, tabs } = useTaskManager()


</script>
