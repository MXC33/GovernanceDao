<template lang="pug">
Slideout(:title="$t(`general.navigation.taskMng`)" :is-open="gameMenu == 'task-manager'" @close="gameMenu = null" :is-nested="subMenuOpen" @step-back="selectedCorporation = null")
  template(#nested-header)
    CorporationName(:corporation="selectedCorporation")

  template(#default)
    TaskManager()

</template>

<script setup lang="ts">
const gameMenu = useGameMenu()
const { selectedCorporation } = useTaskManager()
const subMenuOpen = computed(() => selectedCorporation.value != null)
</script>