<template lang="pug">
div(border="b-1 mc-orange_20"  p="5" space-y="2" uppercase="~")
  p(text="white opacity-80" align="left") {{$t(`inventory.info.status`)}}
  div(border="1 mc-orange_20" flex-center="row" justify="between" p="x-2 y-3")
    p(text="xs mc-mint") {{$t(`inventory.info.active`)}}

    IconActiveSquare(:is-active="isActive", size="sm")
</template>


<script setup lang="ts">
const isActive = true
</script>