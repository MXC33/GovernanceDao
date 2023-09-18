<template lang="pug">
ButtonSound(sound="md" rounded="full" b="1 $mc-mint" p="1" bg="hover:$mc-mint-40")
  nuxt-link(:to="to" font="bdr" color="on-route:mc-mint mc-mint hover:opacity-80" uppercase="~" tracking="0.75" p="x-3 y-1" pos="relative" @mouseenter="isSelected = true" @mouseleave="isSelected = false" :route="isRouteActive") 

    span(text="sm")
      slot

</template>


<script lang="ts" setup>
const props = defineProps<{ to: string }>()

const isSelected = ref(false)
const route = useRoute()

const isRouteActive = computed(() => props.to == route.path)
</script>