<template lang="pug">
img(:src="image" object="contain")
</template>

<script setup lang="ts">
import PixImage from "~/assets/images/thumbs/pix.png"
import FacilityImage from "~/assets/images/thumbs/facility.png"
import TechImage from "~/assets/images/thumbs/drone.png"
import type { BuildType } from '~~/composables/useBuildTools';


const props = defineProps<{
  toolId: BuildType
}>()

const image = computed(() => {
  switch (props.toolId) {
    case 'facility': return FacilityImage
    case 'land': return PixImage
    case 'tech': return TechImage
  }
})

</script>