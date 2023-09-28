<template lang="pug">
button(flex="~ col shrink-0" @click="clickTool" btn="~ tab on-active:tab-active" space-y="2" h="20 lg:30" aspect="square" p="1 lg:3" overflow="hidden" pos="relative" :active="isActive")

  IconCircuitBg(:isActive="isActive" :is-small="true")

  div(flex="~ grow" w="full" pos="relative")
    BuildToolImage(:tool-id="toolId" w="full" h="full" pos="absolute" inset="0")

  div(uppercase="~" text="xs lg:base") {{ title }}
</template>

<script setup lang="ts">
import type { BuildType } from '~~/composables/useBuildTools';
const { buildType } = useBuildTools()
const clickTool = () => buildType.value = props.toolId
const isActive = computed(() => buildType.value == props.toolId)
const props = defineProps<{
  title: string,
  toolId: BuildType
}>()

</script>
