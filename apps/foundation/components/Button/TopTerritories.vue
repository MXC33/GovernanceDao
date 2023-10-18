<template lang="pug">
div.buttonContainer
  button.buttonTerritories( @click="handleClick") {{ label }}
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

<style>
/* ButtonTerritories styles */
.buttonTerritories {
  border: none;
  padding: 10px 15px;
  /* Adjust as needed */
  margin-right: 20px;
  /* Adjust for space between buttons */
  cursor: pointer;
  background-color: transparent;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.buttonTerritories:last-child {
  margin-right: 0;
}

.buttonTerritories.active,
.buttonTerritories:hover {
  color: orange;
  /* Adjust for the desired hover and active text color */
}

.buttonTerritories::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  /* Adjust for the desired border thickness */
  background-color: orange;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.buttonTerritories:hover::after,
.buttonTerritories.active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>