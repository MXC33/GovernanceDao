<template lang="pug">
button(bg="$mc-pink" p="x-12 y-3" color="$mc-whitenew" font="bold" uppercase="~" text="base" rounded="full" h="12"  v-if="value == 'pink'" v-bind="$attrs")
  slot()
button(bg="transparent" p="x-12 y-3" color="$mc-whitenew"  border-color="$mc-whitenew" border="1" h="12"  font="bold" uppercase="~" text="base" rounded="full" v-if="value == 'white'" v-bind="$attrs")
  slot()
button(bg="$mc-blacks" p="x-12 y-3" color="$mc-white-rgb" font="bold" uppercase="~" text="base" rounded="full" m="x-4" h="12"  v-if="value == 'black'" v-bind="$attrs")
  slot()
</template>

<script lang="ts" setup>
defineProps<{
  value: string
}>()
</script>
