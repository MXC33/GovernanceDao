<template lang="pug">
HList(uppercase="~" font="bold" text="white" frame="~" flex-shrink="0" w="12" h="12" items="center" justify="center")
  FilterIcon(p="4" @click="emit('toggleFilter')")
</template>
  

<script lang="ts" setup>
import FilterIcon from '~/assets/icons/filter.svg'

const { displayType, toggleDisplayType } = useCollectionSettings()
const emit = defineEmits(['toggleFilter']);
</script>