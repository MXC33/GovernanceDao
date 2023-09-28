<template lang="pug">
Tabs(:active-item="buildType", :items="tabs", @select="clickSelect" id="build-tabs" :visible-items="3")
</template>

<script setup lang="ts">
import type { BuildType } from '~~/composables/useBuildTools';
const tabs: BuildType[] = ['land', 'tech', 'facility']
const { buildType } = useBuildTools()

const clickSelect = (item) => {
  buildType.value = item
}
</script>
