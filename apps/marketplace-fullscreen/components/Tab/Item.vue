<template lang="pug">
VList(pos="relative")
  HList(font="bold" px="6" py="3" uppercase="~" w="53" cursor="pointer" @click="toggle" items="center" space-x="2")
    span(color="white")
      slot

  Transition(name="fade-slow")
    div(w="full" b="b-3.43 white" z="4" pos="absolute bottom-0" v-if="isActive")


</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: string,
}>()

const activeTab = defineModel<string>()
const isActive = computed(() => activeTab.value && id == activeTab.value)

const toggle = () => {
  activeTab.value = id
}

</script>