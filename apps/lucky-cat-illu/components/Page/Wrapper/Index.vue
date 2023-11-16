<template lang="pug">
div(:id="page" ref="pageElement")
  VList(min-h="100vh" pos="relative" :id="page")
    slot
</template>

<script lang="ts" setup>
const { page } = defineProps<{
  page: string
}>()

const pageElement = ref()
const activePage = useLuckyPage()

const targetIsVisible = ref(false)
useIntersectionObserver(pageElement, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
})

watch(targetIsVisible, () => {
  if (targetIsVisible.value)
    activePage.value = page
})
</script>