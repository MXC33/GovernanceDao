<template lang="pug">
component(:is="listComponent")
</template>

<script setup lang="ts">
import LandGroupList from '~~/components/Build/List/LandGroup.vue'
import TechList from '~~/components/Build/List/Tech.vue'
import FacilityList from '~~/components/Build/List/Facility.vue'

const { buildType } = useBuildTools()

const listComponent = computed(() => {
  switch (buildType.value) {
    case 'land':
      return LandGroupList
    case 'tech':
      return TechList
    case 'facility':
      return FacilityList
  }
})

</script>