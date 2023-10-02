<template lang="pug">
ListContainer(:is-loading="fetchingLand" pb="4")
  BuildToolMenu()
  BuildList()

</template>

<script setup lang="ts">

const { pending: fetchingLand } = useLandData()
</script>