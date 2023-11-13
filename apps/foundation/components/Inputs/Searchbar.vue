<template lang="pug">
HList(frame="~ gray-400" h="10 md:full")
  input(type="text" font="bold" v-model="searchTerm" :placeholder="searchPlaceholder"  @keyup.enter="onChangeSearch" text="lt-md:base"
  bg="gray-900 ix-black" outline="none" px="2" w="full" size="3" overflow="hidden" )
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
