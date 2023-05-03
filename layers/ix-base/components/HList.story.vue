<template lang="pug">
Story()
  HList() Hello my man

  template(#controls)
    HstText(title="default slot" v-model="text")
</template>


<script setup lang="ts">
import { ref } from 'vue'
const text = ref('Click me')
</script>
