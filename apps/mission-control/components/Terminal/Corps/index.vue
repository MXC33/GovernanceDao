<template lang="pug">
.no-scrollbar(grid="lg:~ cols-6 gap-4" flex="lt-lg:~" overflow-x="auto" overflow-y="hidden" p="x-1 y-2")
  TerminalCorpsItem(v-for="item in list" :type="item")
</template>
    
<script lang="ts" setup>
import type { Corporation } from '~~/composables/corporations/useCorporations';

const list: Corporation[] = ['gravity-grade', 'lucky-cat', 'gws', 'new-lands', 'eternalab', 'y-space']
</script>