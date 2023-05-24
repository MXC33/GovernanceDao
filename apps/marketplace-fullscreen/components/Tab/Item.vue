<template lang="pug">
VList(pos="relative")
  HList(font="bold" px="6" py="3" uppercase="~" w="53" cursor="pointer" @click.stop="toggle")
    span(color="white")
      slot

  Transition(name="fade-slow")
    div(w="full" b="b-3.43 white on-primary:ix-primary" z="3" pos="absolute bottom-0" v-if="isActive" :primary="primary")
  
</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: string,
  primary?: boolean
}>()

const activeTab = defineModel<string>()
const isActive = computed(() => activeTab.value && id == activeTab.value)

const toggle = () => {
  activeTab.value = id
}


</script>