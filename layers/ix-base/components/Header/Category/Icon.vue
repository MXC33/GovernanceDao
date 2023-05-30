<template lang="pug">
Icon(w="10" h="10" p="1" color="white")
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';

const props = defineProps<{
  header: string,
  category: string,
  item: string
}>()

const Icon = await import(`../../../assets/images/icons/dropdown/${props.header}/${props.category}/${props.item}.svg`).catch(() => FallbackVue)
</script>