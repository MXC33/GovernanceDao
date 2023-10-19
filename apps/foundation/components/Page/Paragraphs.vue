<template lang="pug">
VList(space-y="6")
  header(space-y="3")
    p(v-if="primary" text="md" font="druk-medium bold") {{$t(`${String(route.name)}.${section}.title`) }}
    p(v-else text="md" font="bold druk") {{$t(`${String(route.name)}.${section}.title`) }}

    p(v-if="description" text="sm" color="gray" font="druk-medium") {{$t(`${String(route.name)}.${description}.description`) }}

  slot
</template>

<script lang="ts" setup>

defineProps<{
  primary?: boolean,
  description?: boolean,
  section: string
}>()

const route = useRoute()
console.log(route)

</script>