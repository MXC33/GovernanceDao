<template lang="pug">
VList(space-y="6")
  header(space-y="1")
    h1(v-if="primary" text="5xl" uppercase="~" font="druk-medium bold") {{$t(`${String(route.name)}.${section}.title`) }}
    h2(v-else text="heading" uppercase="~") {{$t(`${String(route.name)}.${section}.title`) }}

    p(text="md" max-w="180" color="gray-200" font="druk-medium") {{$t(`${String(route.name)}.${section}.description`) }}

  slot
</template>

<script lang="ts" setup>

defineProps<{
  primary?: boolean,
  section: string
}>()

const route = useRoute()
console.log(route)

</script>