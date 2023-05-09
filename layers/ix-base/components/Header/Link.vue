<template lang="pug">
ButtonSound(sound="md")
  NuxtLink(:to="to" font="bdr" color="on-route:mc-orange white hover:opacity-80" uppercase="~" tracking="0.75" p="x-3 y-1" pos="relative" @mouseenter="isSelected = true" @mouseleave="isSelected = false" :route="isRouteActive") 
    transition(name="fade-scale")
      //- IconSelectionCorner(pos="absolute" inset="0" :is-orange="true" v-if="isSelected")

    span(text="sm")
      slot

</template>


<script lang="ts" setup>
const props = defineProps<{ to: string }>()

const isSelected = ref(false)
const route = useRoute()

const isRouteActive = computed(() => props.to == route.path)
</script>