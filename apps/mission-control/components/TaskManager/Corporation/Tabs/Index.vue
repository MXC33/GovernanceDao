<template lang="pug">
VList.taskmanager-tabs(flex-grow="1" space-y="6" mt="5")
  Tabs(:active-item="activeTab", :items="tabs", @select="setActiveTab" id="taskmanager-tabs" :visible-items="tabs.length" v-if="tabs")
    template(#tab="{tab}") {{ spaceCaseIt(tab) }}

  Transition(name="slide-left" mode="out-in")
    slot

</template>

<script setup lang="ts">
import { spaceCaseIt } from 'case-it';
const props = defineProps<{
  tabs: Readonly<string[]>,
  modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])
const activeTab = useVModel(props, 'modelValue', emit)
const setActiveTab = (tab: string) => activeTab.value = tab
</script>

<style>
.taskmanager-tabs {
  --transition-slide-offset: 0.25rem
}
</style>