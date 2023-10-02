<template lang="pug">
HList(b="1 $mc-accent" space-x="2 md:4" pb="4" bg="$corporation-bg-color-60" items="start" overflow="hidden" min-h="45 md:68")
  CorporationAvatar(:corporation="id" translate-x="-1" translate-y="-1" flex-shrink="0")

  VList(p="y-4 r-4" space-y="1") 
    SenderName(text="$mc-accent" font="bold" uppercase="~" :id="id") 
    slot
</template>


<script lang="ts" setup>
const id = useActiveCorporation()

</script>