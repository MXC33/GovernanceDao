<template lang="pug">
HList(pos="absolute md:absolute top-8 left-0" color="white" text="xs" px="4" py="2" mr="15" bg="mc-gray" uppercase="~")

  slot(name="text-info")

</template>

<script lang="ts" setup>
type Titles = 'progression' | 'capacity' | 'perks'
const titles: Titles[] = ['progression', 'capacity', 'progression']

</script>