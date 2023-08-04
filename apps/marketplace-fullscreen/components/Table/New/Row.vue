<template lang="pug">
HList(bg="gray-900 hover:gray-800" min-h="20" items="center" w="full" flex-grow="1" group)
  slot()
</template>

<script lang="ts" setup>
import type { CollectionContext } from '~/composables/useCollection'

const { context } = defineProps<{
  context?: CollectionContext
}>()
</script>