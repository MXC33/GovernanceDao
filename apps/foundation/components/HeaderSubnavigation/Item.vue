<template lang="pug">
div()
  ButtonTab(@click="onClick" :is-selected="isActive" display="lt-md:none" w="full") 
    slot

  button(@click="onClick" display="md:none" p="3" :active="isActive" bg="on-active:(gray-900 opacity-50)" font="bold" w="full")
    slot

</template>

<script lang="ts" setup>

const route = useRoute()
const isPressed = ref(false)

const { path } = defineProps<{
  path: string
}>()

const onClick = () => {
  navigateTo(path)
  isPressed.value = true
}


watch(() => route.path, () => {
  isPressed.value = false
})

const isActive = computed(() => path == route.path || isPressed.value)
</script>