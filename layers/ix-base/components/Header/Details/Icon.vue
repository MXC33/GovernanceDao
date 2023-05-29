<template lang="pug">
Icon(w="10" h="10" p="1" color="white")
</template>

<script lang="ts" setup>
import FallbackVue from '~/components/Fallback.vue';

const props = defineProps<{
  image: string
}>()

const Icon = await import(`../../../assets/images/icons/dropdown/${props.image}.svg`).catch(() => FallbackVue)

</script>