<template lang="pug">
div(flex="~ col" p="2" text="sm mc-orange center" uppercase="~")
  | {{$t(`general.noItemsFound.no`)}} {{ type }} {{ $t(`general.noItemsFound.itemsFound`) }}

</template>

<script setup lang="ts">
defineProps<{
  type?: string
}>()

</script>