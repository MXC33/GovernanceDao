<template lang="pug">
VList(pos="relative" w="full" group)
  HList(font="bold" px="4 md:6" py="3" uppercase="~" w="full" cursor="pointer" @click="toggle" items="center" space-x="2" )
    span(color="gray-200 on-active:white group-hover:opacity-80" :active="isActive")
      slot

  Transition(name="fade-slow")
    div(w="full" b="b-3.43 white" z="4" pos="absolute bottom-0" v-if="isActive")
    //- SUGGESTION
    Transition(name="fade-slow" mode="in-out" v-else)
      div(w="full" b="b-3.43 white opacity-0 group-hover:on-inactive:(gray-200 opacity-60) gray-200" z="4" pos="absolut bottom-0" :inactive="!isActive"  )



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