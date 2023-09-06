<template lang="pug">
button(bg="$mc-pink" p="x-12 y-3" color="$mc-blacks" font="bold" uppercase="~" text="base" rounded="~" v-if="value == 'next'")
  slot()
button(bg="$mc-pink-blur" p="x-12 y-3" color="$mc-white-rgb" border-color="$mc-pink-60" border="1" font="bold" uppercase="~" text="base" rounded="~" m="y-4" v-if="value == 'next-blur'")
  slot()
button(bg="$mc-blacks" p="x-12 y-3" color="$mc-pink" font="bold" uppercase="~" text="base" rounded="~" m="y-4" v-if="value == 'next-black'")
  slot()
button(bg="$mc-gray-600" p="x-12 y-3" color="$mc-gray-700" border-color="$mc-gray-500" border="1" font="bold" uppercase="~" text="base" rounded="~" m="y-4" v-if="value == 'disable'" disabled="~")
  slot()
</template>

<script lang="ts" setup>
defineProps<{
  value: string
}>()
</script>
