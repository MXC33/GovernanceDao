<template lang="pug">
div()
  button.buttonTerritories(:class="{ active: isSelected }" @click="handleClick" uppercase="~" font="bold" btn="~ form") {{ label }}


</template>

<script lang="ts" setup>

const { label, isSelected } = defineProps<{
  label: string
  isSelected: boolean
}>()


const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', label.toLowerCase());
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

.buttonTerritories.active {
  background-color: bg-ix-orange;
  color: #ffffff;
  /* Adjust this for contrast against the orange background, I assumed white might look good. */
}

.buttonTerritories:hover {
  @apply color-ix-orange;
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
  @apply bg-ix-orange;

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