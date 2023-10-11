<template lang="pug">
div.dropdown-container
  label(v-if="label" :for="label") {{ label }}
  select(v-model="selectedOption" class="select")
    option(v-for="(option, index) in options" :key="index" :value="option") {{ option }}
</template>
  
<script lang="ts" setup>
import { ref, defineProps, watch, defineEmits } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const selectedOption = ref('');
const emit = defineEmits();
watch(selectedOption, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>
  
<style scoped>
.dropdown-container {
  position: relative;
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #fff;
}

.select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 10px;
  background-color: black;
  color: white;
  width: 100%;
  box-sizing: border-box;
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-position: 95% center;
  background-repeat: no-repeat;
}
</style>
  