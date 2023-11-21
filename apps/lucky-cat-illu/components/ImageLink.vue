<template lang="pug">
a(bg="black" rounded="full" w="10" md:w="14" aspect="square" :href="href" target="_blank" pos="relative" opacity="hover:80" transition="all")  
  slot

</template>

<script lang="ts" setup>
defineProps<{
  href: string
}>()
</script>