<template lang="pug">
TaskManagerCorporationList(:has-items="items?.length > 0")
  template(#default) 
    TaskManagerProductionItem(v-for="item in items" :task="item")
  template(#noItems) {{$t(`taskManager.noTasks`)}}

</template>

<script setup lang="ts">
import type { ResourceTask } from '~~/composables/useTasks';

defineProps<{
  items: ResourceTask[]
}>()

</script>
