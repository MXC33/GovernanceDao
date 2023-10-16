<template lang="pug">
VList(space-y="6")
  header(space-y="3")
    h1(v-if="primary" text="7xl" font="bold druk-medium") {{$t(`${String(route.name)}.${section}.title`) }}
    h2(v-else text="5xl" font="bold") {{$t(`${String(route.name)}.${section}.title`) }}

    p(text="2xl") {{$t(`${String(route.name)}.${section}.description`) }}

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