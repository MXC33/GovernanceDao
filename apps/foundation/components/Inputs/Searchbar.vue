<template lang="pug">
HList()
  input(type="text" v-model="searchTerm" :placeholder="searchPlaceholder"  @keyup.enter="onChangeSearch" class="input")
  </template>
    
<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n'; // Import the useI18n function
const emit = defineEmits(["input"])

const searchTerm = ref('')
const onChangeSearch = () => {
  emit("input", searchTerm.value)
}

const route = useRoute();

// Use the useI18n function to get the t function
const { t } = useI18n();

// Use the t function to get the placeholder text
const searchPlaceholder = t(`${String(route.name)}.SearchPlaceholder.title`);

</script>
    
<style scoped>
.input {
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: black;
  color: white;
  width: 100%;
  box-sizing: border-box;
}
</style>
  