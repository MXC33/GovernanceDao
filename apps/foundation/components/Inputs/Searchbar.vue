<template lang="pug">
<<<<<<< Updated upstream
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

=======
div(relative flex items-center justify-between border="2 solid gray-500" rounded="md" bg="black" w="full" transition="border" hover:border="2 solid gray-300/80%")
  span(flex-shrink="0" flex items-center bg="gray-600" px="3" py="3")
    CardTitle() {{ label }}
  input(type="number" flex-grow="1" border="none" bg="transparent" text="lg white" h="9" p="0" ml="2" focus:outline="none" v-model="searchQuery" :placeholder="searchPlaceholder")
</template>
      
  <script lang="ts" setup>
  import { ref, defineProps } from 'vue';
  import { useI18n } from 'vue-i18n'; 
  
  const { routeKey, label} = defineProps({
    routeKey: {
      type: String,
      required: true
    },
    label: String
  })
  
  const searchQuery = ref('');
  
  const { t } = useI18n();
  const searchPlaceholder = t(routeKey);
>>>>>>> Stashed changes
</script>
    
<style scoped>

</style>