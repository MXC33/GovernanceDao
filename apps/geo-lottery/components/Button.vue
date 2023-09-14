<template lang="pug">
button(class="pink-btn" bg="hover:gray-300" p="x-9 sm:x-10 md:x-12 y-3" color="$mc-whitenew" font="bold" uppercase="~" text="sm sm:base" rounded="full" h="12"  v-if="value == 'pink'" v-bind="$attrs")
  slot()
button(bg="transparent hover:(white opacity-10) " p="x-9 sm:x-10 md:x-12 y-3" color="$mc-whitenew"  border-color="$mc-whitenew" border="1" h="12"  font="bold" uppercase="~" text="sm sm:base" rounded="full" v-if="value == 'white'" v-bind="$attrs")
  slot()
</template>

<script lang="ts" setup>
defineProps<{
  value: string
}>()
</script>
<style>

.pink-btn{
  background: linear-gradient(rgba(255, 30, 110, 1) , rgba(200, 10, 77, 1));
  transition: none;
}
.pink-btn:hover{
  background: #FF1E6E;
}
</style>
