<template lang="pug">
HList(pos="absolute top-0" font="bold" z="-1" text="3" uppercase="~" tracking="wide" p="0.25" my="-0.08")

  HList(bg="gray-200" color="whitenew" px="1" cut="bottom-right s-xs")
    slot(name="tile")

  slot(name="percent")

</template>

<script lang="ts" setup>

</script>