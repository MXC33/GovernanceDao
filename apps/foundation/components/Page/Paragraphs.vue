<template lang="pug">
VList(space-y="default")
  header(space-y="3")
    p(v-if="primary" text="md" font="druk-medium bold") {{$t(`${String(route.name)}.${section}.title`) }}
    p(v-else text="md") {{$t(`${String(route.name)}.${section}.title`) }}

    p(v-if="description" text="s" color="gray" font="druk-medium") {{$t(`${String(route.name)}.${section}.description`) }}

  slot
</template>

<script lang="ts" setup>
defineProps<{
  primary?: boolean;
  description?: boolean;
  section: string;
}>();

const route = useRoute();
</script>
