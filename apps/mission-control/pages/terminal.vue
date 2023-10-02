<template lang="pug">
div(flex="~ col grow" min-h="0" pos="relative")
  Terminal()
  
</template>


<script lang="ts" setup>

const { ixBlogs } = useMcIXAPI()
const { execute: fetchBlogs } = ixBlogs()

await fetchBlogs()

</script>

<style></style>