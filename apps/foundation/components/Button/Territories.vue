<template lang="pug">
button.buttonTerritories(@click="handleClick") {{ label }}
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: String
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.label.toLowerCase());
};
</script>
