<template lang="pug">
iframe(ref="element")
</template>

<script lang="ts" setup>
const { url } = defineProps<{
  url: string
}>()

const element = ref()

const data = await fetch(url)
const html = await data?.text()

onMounted(() => {
  if (url) {
    const iframe = element.value

    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  }
})
</script>