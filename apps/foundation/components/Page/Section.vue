<template lang="pug">
VList(space-y="6")
  header(space-y="3")
    h1(v-if="primary" text="5xl" font="druk-medium bold") {{$t(`${String(route.name)}.${section}.title`) }}
    h2(v-else text="3xl" font="bold druk") {{$t(`${String(route.name)}.${section}.title`) }}

    p(text="md" color="gray" font="druk") {{$t(`${String(route.name)}.${section}.description`) }}

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