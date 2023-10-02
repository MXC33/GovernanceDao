<template lang="pug">
div(grid="md:~ cols-2 gap-4" space-y="lt-md:3" flex="lt-md:(~ col)" flex-grow="1" min-h="md:0")

  CorporationOverviewDescription()

  VList(space-y="4" h="md:full" flex-grow="1" overflow-y="md:auto" overflow-x="hidden" scrollbar="md:(~ mc)" min-h="md:0")
    slot

</template>

<script lang="ts" setup>
</script>