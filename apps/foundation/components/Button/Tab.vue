<template lang="pug"> 
button.button-tab(:class="{ active: isSelected }" pos="relative" py="3" :active="isSelected" color="on-active:white gray-300" text="center") 
  slot
</template>

<script lang="ts" setup>

const { isSelected } = defineProps<{
  isSelected: boolean
}>()

</script>

<style>
.button-tab {
  transition: all 0.3s ease-in-out;
}

.button-tab::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;

  @apply bg-ix-orange;
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.button-tab:hover::after,
.button-tab.active::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>