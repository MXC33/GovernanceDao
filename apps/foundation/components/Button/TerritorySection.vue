<template>
  button(btn="~ form" p="6" @click="handleClick") {{ label }}
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String | undefined
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.label.toLowerCase());
};
</script>