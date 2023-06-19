<template lang="pug">
Icon(h="10" w="10")
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