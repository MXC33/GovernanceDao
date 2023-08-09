<template lang="pug">
VList(w="full" px="4" b="b-1 gray-600" )
  HList(items="center" text="md" font="bold" :active="isActive" justify="between" capitalize="~" b="b-1 gray-600" mx="-4" px="4")
    VList(v-for="(tab, index) in itemTabs" :key="index" color="white" bg="none" cursor="pointer" @click="handleTabClick(tab)" pos="relative" h="12" justify="center") 
      div {{ tab }}

      Transition(name="fade-slow" mode="in-out")
        div(v-if="tab === activeTab" w="full" b="on-active:b-2 white" pos="absolute bottom-(-0.3)" z="4" :active="isTabActive")

  VList(w="full")
    Transition(name="slide-left" mode="out-in")
      div(:key="activeTab")
        slot(name="activeTab" :tab="activeTab")

</template>

<script lang="ts" setup>
import type { SingleItemTabType } from '~/composables/useTabs';

const itemTabs: SingleItemTabType[] = ['details', 'offers', 'listings', 'item-activity']

const { isActive } = defineProps<{
  isActive?: boolean
}>()

const emit = defineEmits(['tab-clicked'])

const activeTab = ref<SingleItemTabType>('details')

const setActiveTab = (tab: SingleItemTabType) => {
  activeTab.value = tab
}

const isTabActive = computed(() => activeTab.value == activeTab.value)

const handleTabClick = (tab: SingleItemTabType) => {
  setActiveTab(tab)
  emit('tab-clicked')
}
</script>