<template lang="pug">
Tabs(:active-item="activeTab", :items="tabs", @select="setActiveTab" id="overview-tabs" :visible-items="tabs.length")
  template(#tab="{tab}") {{ spaceCaseIt(tab) }}
</template>

<script lang="ts" setup>
import { spaceCaseIt } from 'case-it';

const props = defineProps<{
  tabs: Readonly<string[]>
  modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])
const activeTab = useVModel(props, 'modelValue', emit)
const setActiveTab = (tab: string) => activeTab.value = tab

</script>